import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8020';
  private jwt = new JwtHelperService();

  constructor(private http : HttpClient) { }

  login(loginRequest : any): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.apiUrl +'/auth/login', loginRequest).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }
}
