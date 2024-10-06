import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/shared/services/question.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-question',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, RouterModule],
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {

  questions: Question[] = [];
  questionToDelete: Question | null = null;
  showModal = false;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.getQuestions();
  }

  public getQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (response: Question[]) => {
        console.log(response);
        this.questions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  openDeleteModal(question: Question): void {
    this.questionToDelete = question;
    this.showModal = true;
  }

  cancelDelete(): void {
    this.showModal = false;
    this.questionToDelete = null;
  }

  confirmDelete(): void {
    if (this.questionToDelete && this.questionToDelete.id !== undefined) {
      this.deleteQuestion(this.questionToDelete.id);
  }
  }

  deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.getQuestions(); 
      this.cancelDelete(); 
    });
  }

}
