import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IOperador } from '@/types/operador';

interface SelectOperadorProps {
  operadores: IOperador[];
  onSelectOperador: (operador: IOperador) => void;
}

export const SelectOperador: React.FC<SelectOperadorProps> = ({ 
  operadores, 
  onSelectOperador 
}) => {
  return (
    <div>
      <label className="block mb-2">Seleccionar Operador</label>
      <Select 
        onValueChange={(value) => {
          const operador = operadores.find(o => o.id === parseInt(value));
          if (operador) onSelectOperador(operador);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccione Operador" />
        </SelectTrigger>
        <SelectContent>
          {operadores.map((operador) => (
            <SelectItem key={operador.id} value={`${operador.id}`}>
              {operador.nombre} - {operador.especialidad}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
