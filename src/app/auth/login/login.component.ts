import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatCardModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email : string | undefined;
  password : string | undefined;
  loginForm! : FormGroup;
  errorMessage: string | undefined;

  constructor(
    private authService : AuthService, 
    private router : Router,
    private formbuilder : FormBuilder,
    
  ){}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email  : ['',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password  : ['',[Validators.required]]
    })
  }

  sendForm(){
    console.log(this.loginForm.value)
    if(this.loginForm.valid){

      this.authService.login(this.loginForm.value).subscribe(
        response =>{
          const role = this.authService.getCurrentUserRole();
          if(role){
              console.log(response);
              this.redirectUsers(role);
          }else{
            this.router.navigate(['/login'])
          }
        },
        error =>{
          this.errorMessage = "invalid email or password.";
          console.log("Failed to log in", JSON.stringify(error));
        }
      );

    }else{
      console.error('Form is invalid');
    }
  }

  public redirectUsers(role : string) : void {
    
    switch(role){
      case 'ADMIN' : 
        this.router.navigate(['/admin/admin-dashboard']);
        break;

      case 'USER' :
        this.router.navigate(['/user/user-home']);
        break;

      default : this.router.navigate(['/login']);

      
    }
}

}
