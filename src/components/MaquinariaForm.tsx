import { IMaquinaria } from '@/types/maquinaria';
import React from 'react';

interface MaquinariaFormProps {
  currentMaquinaria?: IMaquinaria | null;
  onSubmit: (maquinaria: IMaquinaria) => void;
  onCancel: () => void;
}

export const MaquinariaForm: React.FC<MaquinariaFormProps> = ({ 
  currentMaquinaria, 
  onSubmit, 
  onCancel 
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMaquinaria: IMaquinaria = {
      id: currentMaquinaria?.id || 0,
      nombre: formData.get('nombre') as string,
      modelo: formData.get('modelo') as string,
      capacidad: parseInt(formData.get('capacidad') as string),
      estado: formData.get('estado') as 'available' | 'in_use' | 'maintenance',
      ultimoServicio: formData.get('ultimoServicio') as string,
      proximoServicio: formData.get('proximoServicio') as string
    };
    onSubmit(newMaquinaria);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            defaultValue={currentMaquinaria?.nombre || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>
        {/* Add other form fields similarly */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Próximo Servicio</label>
          <input
            type="date"
            name="proximoServicio"
            defaultValue={currentMaquinaria?.proximoServicio || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};