import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cattle } from '../../models/cattle.model';

@Injectable({
  providedIn: 'root',
})
export class CattleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCattle(): Observable<Cattle[]> {
    return this.http.get<Cattle[]>(`${this.apiUrl}/cattle`);
  }

  addCattle(cattleData: FormData): Observable<Cattle> {
    return this.http.post<Cattle>(`${this.apiUrl}/cattle`, cattleData);
  }

  updateCattle(id: number, cattleData: FormData): Observable<Cattle> {
    return this.http.patch<Cattle>(`${this.apiUrl}/cattle/${id}`, cattleData);
  }

  getCattleById(id: number): Observable<Cattle> {
    return this.http.get<Cattle>(`${this.apiUrl}/cattle/${id}`);
  }
}
