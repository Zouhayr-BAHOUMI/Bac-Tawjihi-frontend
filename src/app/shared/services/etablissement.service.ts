import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtablissementDto } from 'src/app/dto/etablissement-dto';
import { TypeEtablissement } from 'src/app/enums/type-etablissement';
import { Etablissement } from 'src/app/interfaces/etablissement';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  private apiUrl = 'http://localhost:8082/admin/gestion-etablissements';
  private apiUrl2 = 'http://localhost:8082/home';

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

  public getHomeEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl2}/etablissements`);
  }
  

  getHomeEtablissementsByUniversite(idUniversite: number): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl2}/universite/${idUniversite}`);
  }

  public getEtablissementsByType(typeEtablissement: TypeEtablissement): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl2}/type/${typeEtablissement}`);
  }

  searchEtablissements(query: string): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl2}/search?query=${query}`);
  }

  public getHomeEtablissementById(idEtablissement: number): Observable<Etablissement> {
    return this.http.get<Etablissement>(`${this.apiUrl2}/idEtablissement?idEtablissement=${idEtablissement}`);
  }

  public getHomeEtablissementsPagination(page: number, size: number): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiUrl2}/etablissement?page=${page}&size=${size}`);
  }
}
