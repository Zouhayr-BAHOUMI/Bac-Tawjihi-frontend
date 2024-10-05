import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from 'src/app/interfaces/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = 'http://localhost:8082/admin/gestion-tests';  

  constructor(private http: HttpClient) { }

  public getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/`);
  }

  public addTest(test: Test): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, test, {
      responseType: 'text' as 'json'
    });
  }

  public getTestById(idTest: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/idTest?idTest=${idTest}`);
  }

  public updateTest(idTest: number, test: Test): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${idTest}`, test, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public deleteTest(idTest: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idTest}`);
  }
}
