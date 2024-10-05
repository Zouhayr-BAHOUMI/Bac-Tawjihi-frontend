import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestService } from 'src/app/shared/services/test.service';
import { Router, RouterModule } from '@angular/router';
import { Test } from 'src/app/interfaces/test';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  createTestForm: FormGroup;

  constructor(
    private testService: TestService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createTestForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createTestForm.valid) {

      const testToAdd: Test = {
        ...this.createTestForm.value
      };

      this.testService.addTest(testToAdd).subscribe(
        response => {
          console.log('Test created successfully', response);
          this.router.navigate(['/admin/admin-dashboard/test']);
        },
        error => {
          console.error('Error creating test', error);
        }
      );
    }
  }

}
