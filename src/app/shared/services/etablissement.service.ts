import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtablissementDto } from 'src/app/dto/etablissement-dto';
import { Etablissement } from 'src/app/interfaces/etablissement';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  private apiUrl = 'http://localhost:8082/admin/gestion-etablissements';

  constructor(private http: HttpClient) { }


  public getAllEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl}/`);
  }


  public addEtablissement(etablissementDto: EtablissementDto, idUniversite: number): Observable<EtablissementDto> {
    return this.http.post<EtablissementDto>(`${this.apiUrl}/add/${idUniversite}`, etablissementDto, { responseType: 'text' as 'json' });
  }


  public getEtablissementById(idEtablissement: number): Observable<Etablissement> {
    return this.http.get<Etablissement>(`${this.apiUrl}/idEtablissement?idEtablissement=${idEtablissement}`);
  }


  public updateEtablissement(idEtablissement: number, etablissementDto: EtablissementDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${idEtablissement}`, etablissementDto, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


  public deleteEtablissement(idEtablissement: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idEtablissement}`);
  }

  getEtablissementsByUniversite(idUniversite: number): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl}/universite/${idUniversite}`);
  }
}
