import React from 'react';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { IMaquinaria } from '@/types/maquinaria';

interface MaquinariaTableProps {
  maquinarias: IMaquinaria[];
  onEdit: (maquinaria: IMaquinaria) => void;
  onDelete: (id: string) => void;
}

export const MaquinariaTable: React.FC<MaquinariaTableProps> = ({ 
  maquinarias, 
  onEdit, 
  onDelete 
}) => {
  const calculateDaysToService = (proximoServicio?: string) => {
    if (!proximoServicio) return null;
    const today = new Date();
    const serviceDate = new Date(proximoServicio);
    const diffTime = serviceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Modelo</th>
            <th className="px-6 py-3">Capacidad</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3">Próximo Servicio</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {maquinarias.map((maquinaria) => {
            const diasParaServicio = calculateDaysToService(maquinaria.proximoServicio);
            
            return (
              <tr key={maquinaria.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{maquinaria.nombre}</td>
                <td className="px-6 py-4">{maquinaria.modelo}</td>
                <td className="px-6 py-4">{maquinaria.capacidad}</td>
                <td className="px-6 py-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${maquinaria.estado === 'available' ? 'bg-green-100 text-green-800' : 
                      maquinaria.estado === 'in_use' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}
                  `}>
                    {maquinaria.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {maquinaria.proximoServicio && (
                    <div className="flex items-center">
                      {diasParaServicio !== null && diasParaServicio <= 30 && (
                        <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                      )}
                      <span>
                        {new Date(maquinaria.proximoServicio).toLocaleDateString()}
                        {diasParaServicio !== null && (
                          <span className={`ml-2 text-xs ${diasParaServicio <= 30 ? 'text-orange-600 font-bold' : ''}`}>
                            ({diasParaServicio} días)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button 
                    onClick={() => onEdit(maquinaria)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => onDelete(maquinaria.id.toString())}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};