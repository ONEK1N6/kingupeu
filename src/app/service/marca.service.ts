import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = 'http://localhost:8080/api/marcas';

  constructor(private http: HttpClient) {}

  // Listar todas las marcas
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  // Obtener una marca por ID
  getMarcaById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva marca
  createMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca);
  }

  // Eliminar una marca por ID
  deleteMarca(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Actualizar una marca existente
  updateMarca(marca: Marca, id: number): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, marca);
  }
}
