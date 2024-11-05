import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root',
})
export class CocheService {
  private apiUrl = 'http://localhost:8080/api/coches'; // Cambia esto si tu URL es diferente

  constructor(private http: HttpClient) {}

  // Método para crear un coche
  createCoche(coche: Coche): Observable<Coche> {
    return this.http.post<Coche>(this.apiUrl, coche);
  }

  // Método para obtener todos los coches
  getCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(this.apiUrl);
  }

  // Método para actualizar un coche
  updateCoche(coche: Coche, id: number): Observable<Coche> {
    return this.http.put<Coche>(`${this.apiUrl}/${id}`, coche);
  }

  // Método para eliminar un coche
  deleteCoche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener un coche por su ID
  getCocheById(id: number): Observable<Coche> {
    return this.http.get<Coche>(`${this.apiUrl}/${id}`);
  }
}
