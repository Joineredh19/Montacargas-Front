import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { IServicioAlquiler } from '@/types/alquiler';

interface TablaServiciosProps {
  servicios: IServicioAlquiler[];
  onEditarServicio?: (servicio: IServicioAlquiler) => void;
  onCancelarServicio?: (id: number) => void;
}

export const TablaServicios: React.FC<TablaServiciosProps> = ({ 
  servicios, 
  onEditarServicio, 
  onCancelarServicio 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Maquinaria</TableHead>
          <TableHead>Operador</TableHead>
          <TableHead>Fecha Inicio</TableHead>
          <TableHead>Fecha Fin</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {servicios.map((servicio) => (
          <TableRow key={servicio.id}>
            <TableCell>{servicio.maquinaria.nombre}</TableCell>
            <TableCell>{servicio.operador.nombre}</TableCell>
            <TableCell>{new Date(servicio.fechaInicio).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(servicio.fechaFin).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={`
                px-2 py-1 rounded-full text-xs 
                ${servicio.estado === 'Programado' ? 'bg-blue-100 text-blue-800' : 
                  servicio.estado === 'En Progreso' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'}
              `}>
                {servicio.estado}
              </span>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => onEditarServicio?.(servicio)}
                    className="cursor-pointer"
                  >
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onCancelarServicio?.(servicio.id)}
                    className="cursor-pointer text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Cancelar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};