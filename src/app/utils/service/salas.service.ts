import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../model/Sala';

@Injectable({ providedIn: 'root' })
export class SalasService {
  private apiUrl = 'http://localhost:8080/salas';
  constructor(private http: HttpClient) {}
  
  getSalas(id: Number): Observable<Sala[]> {
      return this.http.get<any[]>(`${this.apiUrl}/lista-salas`);
    }
}
