import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from 'src/app/interfaces/question';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from 'src/app/shared/services/etudiant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent {

  questions: Question[] = [];
  selectedAnswers: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idTest = +params['id'];
      this.getQuestions(idTest);
    });
  }

  public getQuestions(idTest : number): void {
    this.etudiantService.getRandomQuestions(idTest).subscribe(
      (response: Question[]) => {
        console.log(response);
        this.questions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  submitQuiz() {
    console.log('Submitted answers:');
    // Implement the logic to submit the answers to your backend
  }

}
