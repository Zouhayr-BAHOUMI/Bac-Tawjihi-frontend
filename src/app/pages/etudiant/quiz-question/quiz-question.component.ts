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
  reponsesChoisi: { [idQuestion: number]: { idChoix: number, isCorrect: boolean } } = {};
  selectedForQuestion: { [idQuestion: number]: boolean } = {}; 

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

  selectChoice(idQuestion: number, idChoix: number, isCorrect: boolean) {

    if (this.selectedForQuestion[idQuestion]) {
      return;
    }

    this.reponsesChoisi[idQuestion] = { idChoix, isCorrect };
    this.selectedForQuestion[idQuestion] = true;
  }

  submitQuiz() {

    const idSelectedChoix = Object.values(this.reponsesChoisi).map(answer => answer.idChoix);
    this.etudiantService.submitReponses(idSelectedChoix).subscribe(
      (response: any) => {
        console.log('Quiz result:', response);
        alert(response); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error submitting quiz:', error);
      }
    );

  }

}
