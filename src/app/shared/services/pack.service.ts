import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pack } from 'src/app/interfaces/pack';

@Injectable({
  providedIn: 'root'
})
export class PackService {

  private apiUrl = 'http://localhost:8082/admin/gestion-packs';

  constructor(private http: HttpClient) { }

  public getPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.apiUrl}/`);
  }

  public addPack(pack: Pack): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, pack, {
      responseType: 'text' as 'json'
    });
  }

  public getPackById(idPack: number): Observable<Pack> {
    return this.http.get<Pack>(`${this.apiUrl}/idPanne?idPack=${idPack}`);
  }

  public getPackWithFilieres(idPack: number): Observable<Pack> {
    return this.http.get<Pack>(`${this.apiUrl}/filieres/${idPack}`);
  }

  public getAllPacksWithFilieres(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.apiUrl}/filieres`);
  }

  public updatePack(idPack: number, pack: Pack): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${idPack}`, pack, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public deletePack(idPack: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idPack}`);
  }
}
