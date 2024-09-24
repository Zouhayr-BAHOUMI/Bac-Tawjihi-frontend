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

  logout() : void{
    localStorage.removeItem('token');
  }

  getToken() : string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.jwt.isTokenExpired(token);
  }

  getCurrentUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }
}
