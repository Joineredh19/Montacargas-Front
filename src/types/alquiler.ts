import { IMaquinaria } from "./maquinaria";
import { IOperador } from "./operador";

export interface IServicioAlquiler {
    id: number;
    maquinaria: IMaquinaria;
    operador: IOperador;
    fechaInicio: Date;
    fechaFin: Date;
    cliente: string;
    estado: 'Programado' | 'En Progreso' | 'Completado' | 'Cancelado';
  }