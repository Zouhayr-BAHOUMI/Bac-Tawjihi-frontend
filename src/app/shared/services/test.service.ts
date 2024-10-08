import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from 'src/app/interfaces/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = 'http://localhost:8082/admin/gestion-tests'; 
  private apiUrl2 = 'http://localhost:8082/home'; 

  constructor(private http: HttpClient) { }

  public getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/`);
  }

  public getRandomTest(): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl2}/test/random-test`);
  }

  public assignTestToEtudiant(idTest: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl2}/test/${idTest}/assign`, {});
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
