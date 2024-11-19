import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormularioServicio } from '@/components/FormularioServicio';
import { IMaquinaria } from '@/types/maquinaria';
import { IOperador } from '@/types/operador';
import { IServicioAlquiler } from '@/types/alquiler';
import { Plus } from 'lucide-react';

interface ServiciosModalProps {
  maquinarias: IMaquinaria[];
  operadores: IOperador[];
  onAgregarServicio: (servicio: Omit<IServicioAlquiler, 'id'>) => void;
}

export const ServiciosModal: React.FC<ServiciosModalProps> = ({ 
  maquinarias, 
  operadores, 
  onAgregarServicio 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleServicioAgregado = (nuevoServicio: Omit<IServicioAlquiler, 'id'>) => {
    onAgregarServicio(nuevoServicio);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Crear Nuevo Servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-orange-800">Crear Nuevo Servicio de Alquiler</DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <FormularioServicio
            maquinarias={maquinarias}
            operadores={operadores}
            onAgregarServicio={handleServicioAgregado}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};