import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private apiUrl = 'http://localhost:8080/api/tipos';

  constructor(private http: HttpClient) {}

  // Listar todos los tipos
  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiUrl);
  }

  // Obtener un tipo por ID
  getTipoById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo tipo
  createTipo(tipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(this.apiUrl, tipo);
  }

  // Eliminar un tipo por ID
  deleteTipo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Actualizar un tipo existente
  updateTipo(tipo: Tipo, id: number): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.apiUrl}/${id}`, tipo);
  }
}
