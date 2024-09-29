import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universite } from 'src/app/interfaces/universite';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  private apiUrl = 'http://localhost:8082/admin/gestion-universities';

  constructor(private http: HttpClient) { }

  public getUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl}/`);
  }
}
