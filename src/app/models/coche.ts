import { Marca } from './marca';
import { Tipo } from './tipo';

export class Coche {
  id: number;
  placa: string;
  puertas: number;
  idMarca: Marca; // Llave foránea de Marca
  idTipo: Tipo;   // Llave foránea de Tipo

  constructor(
    id: number = 0,
    placa: string = '',
    puertas: number = 4,
    idMarca: Marca = { id: 0, nombre: '' },
    idTipo: Tipo = { id: 0, nombre: '' }
  ) {
    this.id = id;
    this.placa = placa;
    this.puertas = puertas;
    this.idMarca = idMarca;
    this.idTipo = idTipo;
  }
}