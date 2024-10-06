import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8082/admin/gestion-questions';  

  constructor(private http: HttpClient) { }

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/`);
  }

  public addQuestion(question: Question, idTest: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add?idTest=${idTest}`, question, {
      responseType: 'text' as 'json'
    });
  }

  public getQuestionById(idQuestion: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/idPanne?idQuestion=${idQuestion}`);
  }

  public updateQuestion(idQuestion: number, question: Question): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${idQuestion}`, question, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public deleteQuestion(idQuestion: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idQuestion}`);
  }
}
