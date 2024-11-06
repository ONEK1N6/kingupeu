import { Marca } from './marca';
import { Tipo } from './tipo';

export class Coche {
  id: number;
  placa: string;
  puertas: number;
  marca: Marca;
  tipo: Tipo;

  constructor(
    id: number = 0,
    placa: string = '',
    puertas: number = 4,
    marca: Marca = { id: 0, nombre: '' },
    tipo: Tipo = { id: 0, nombre: '' }
  ) {
    this.id = id;
    this.placa = placa;
    this.puertas = puertas;
    this.marca = marca;
    this.tipo = tipo;
  }
}
