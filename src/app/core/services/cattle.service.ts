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
    return this.http.get<Cattle[]>(this.apiUrl);
  }

  addCattle(cattle: Cattle): Observable<Cattle> {
    return this.http.post<Cattle>(this.apiUrl, cattle);
  }

  updateAvailability(id: number, available: boolean): Observable<Cattle> {
    return this.http.patch<Cattle>(`${this.apiUrl}/${id}`, { available });
  }
}
