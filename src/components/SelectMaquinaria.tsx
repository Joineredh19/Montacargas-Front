import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IMaquinaria } from '@/types/maquinaria';

interface SelectMaquinariaProps {
  maquinarias: IMaquinaria[];
  onSelectMaquinaria: (maquinaria: IMaquinaria) => void;
}

export const SelectMaquinaria: React.FC<SelectMaquinariaProps> = ({ 
  maquinarias, 
  onSelectMaquinaria 
}) => {
  return (
    <div>
      <label className="block mb-2">Seleccionar Maquinaria</label>
      <Select 
        onValueChange={(value) => {
          const maquinaria = maquinarias.find(m => m.id === parseInt(value));
          if (maquinaria) onSelectMaquinaria(maquinaria);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccione Maquinaria" />
        </SelectTrigger>
        <SelectContent>
          {maquinarias.map((maquinaria) => (
            <SelectItem key={maquinaria.id} value={`${maquinaria.id}`}>
              {maquinaria.nombre} - {maquinaria.capacidad} 'TON'
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};