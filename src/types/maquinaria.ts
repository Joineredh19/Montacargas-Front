export interface IMaquinaria {
    id: number;
    nombre: string;
    modelo: string;
    capacidad: number;
    estado: 'available' | 'in_use' | 'maintenance';
    ultimoServicio?: string;
    proximoServicio?: string;
}



