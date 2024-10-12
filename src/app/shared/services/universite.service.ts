import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversiteDto } from 'src/app/dto/universite-dto';
import { Universite } from 'src/app/interfaces/universite';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  private apiUrl = 'http://localhost:8082/admin/gestion-universities';
  private apiUrl2 = 'http://localhost:8082/home';

  constructor(private http: HttpClient) { }

  public getUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl}/`);
  }

  public getHomeUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl2}/universities`);
  }

   public addUniversite(universiteDto: UniversiteDto): Observable<UniversiteDto> {
    return this.http.post<UniversiteDto>(`${this.apiUrl}/add`, universiteDto);
  }

  public getUniversiteById(idUniversite: number): Observable<Universite> {
    return this.http.get<Universite>(`${this.apiUrl}/idUniversite?idUniversite=${idUniversite}`);
  }

  public updateUniversite(idUniversite: number, universiteDto: UniversiteDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${idUniversite}`, universiteDto, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public deleteUniversite(idUniversite: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idUniversite}`);
  }
}
