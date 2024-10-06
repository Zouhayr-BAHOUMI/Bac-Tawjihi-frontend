import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Domain } from 'src/app/enums/domain';
import { QuestionService } from 'src/app/shared/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  questionForm: FormGroup;
  domains = Object.values(Domain);
  idTest!: number;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.questionForm = this.formBuilder.group({
      contenuQuestion: ['', Validators.required],
      domain: ['', Validators.required],
      choix: this.formBuilder.group({
        isCorrect: [0, Validators.required],
        contenuChoix0: ['', Validators.required],
        contenuChoix1: ['', Validators.required],
        contenuChoix2: ['', Validators.required],
        contenuChoix3: ['', Validators.required],
      })
    });
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.idTest = +params.get('idTest')!; 
      console.log(this.idTest)
    });

    
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;
      const question: Question = {
        contenuQuestion: formValue.contenuQuestion,
        domain: formValue.domain,
        choix: [0, 1, 2, 3].map(i => ({
          contenuChoix: formValue.choix[`contenuChoix${i}`],
          isCorrect: formValue.choix.isCorrect === i
        }))
      };

      console.log(this.questionForm)

      this.questionService.addQuestion(question, this.idTest).subscribe(
        response => {
          console.log('Question added successfully', response);
          this.router.navigate(['/admin/admin-dashboard/test']);
        },
        error => {
          console.error('Error adding question', error);
        }
      );
    }
  }

}
