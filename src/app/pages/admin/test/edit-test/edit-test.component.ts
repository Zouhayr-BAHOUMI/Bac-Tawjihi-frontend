import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from 'src/app/shared/services/test.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Test } from 'src/app/interfaces/test';

@Component({
  selector: 'app-edit-test',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit{

  editTestForm: FormGroup;
  idTest!: number;
  test: Test = {} as Test;

  constructor(
    private testService: TestService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editTestForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTest = +params['idTest'];

      this.testService.getTestById(this.idTest).subscribe(
        (response: Test) => {
          console.log(response);
          this.test = response;
          this.editTestForm.patchValue({
            titre: response.titre,
            description: response.description,
            duree: response.duree
          });
        },
        error => {
          console.log('Error fetching test:', error);
        }
      );
    });
  }

  onSubmit(): void {
    if (this.editTestForm.valid) {
      const testToUpdate = {
        ...this.editTestForm.value
      };

      this.testService.updateTest(this.idTest, testToUpdate).subscribe(
        response => {
          console.log('Test updated successfully', response);
          this.router.navigate(['/admin/admin-dashboard/test']);
        },
        error => {
          console.error('Error updating test', error);
        }
      );
    }
  }

}
