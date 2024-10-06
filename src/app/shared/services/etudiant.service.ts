import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from 'src/app/interfaces/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = 'http://localhost:8082/etudiant';

  constructor(private http: HttpClient) { }

  public getEtudiantProfile(): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/profile`);
  }

  public completeProfile(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/compete`, etudiant, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public selectPack(idPack: number): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${this.apiUrl}/choisir-pack/${idPack}`, {});
  }
}