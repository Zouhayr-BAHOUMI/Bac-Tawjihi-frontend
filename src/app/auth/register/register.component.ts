import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/compenants/landing-page/header/header.component';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule ,RouterModule, MatFormFieldModule, MatInputModule, MatCardModule, MatCheckboxModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formbuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      if (formValue.password !== formValue.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      const registerRequest = {
        fullname: formValue.fullname,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword
      };

      this.authService.register(registerRequest).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = "Failed to register. Try again.";
          console.error('Registration failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
