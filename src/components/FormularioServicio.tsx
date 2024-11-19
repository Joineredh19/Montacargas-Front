import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectMaquinaria } from './SelectMaquinaria';
import { SelectOperador } from './SelectOperador';
import { IMaquinaria } from '@/types/maquinaria';
import { IOperador } from '@/types/operador';
import { IServicioAlquiler } from '@/types/alquiler';
import { Calendar } from './ui/calendar';

interface FormularioServicioProps {
  maquinarias: IMaquinaria[];
  operadores: IOperador[];
  onAgregarServicio: (servicio: Omit<IServicioAlquiler, 'id'>) => void;
}

export const FormularioServicio: React.FC<FormularioServicioProps> = ({
  maquinarias,
  operadores,
  onAgregarServicio
}) => {
  const [selectedMaquinaria, setSelectedMaquinaria] = useState<IMaquinaria | null>(null);
  const [selectedOperador, setSelectedOperador] = useState<IOperador | null>(null);
  const [fechaInicio, setFechaInicio] = useState<Date>(new Date());
  const [horaInicio, setHoraInicio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [cliente, setCliente] = useState('');

  const handleSubmit = () => {
    if (!selectedMaquinaria || !selectedOperador || !horaInicio || !duracion || !cliente) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const fechaServicio = new Date(fechaInicio);
    const [horas, minutos] = horaInicio.split(':').map(Number);
    fechaServicio.setHours(horas, minutos);

    const fechaFin = new Date(fechaServicio);
    fechaFin.setHours(fechaFin.getHours() + parseInt(duracion));

    const nuevoServicio = {
      maquinaria: selectedMaquinaria,
      operador: selectedOperador,
      fechaInicio: fechaServicio,
      fechaFin: fechaFin,
      cliente,
      estado: 'Programado' as const
    };

    onAgregarServicio(nuevoServicio);

    // Limpiar formulario
    setSelectedMaquinaria(null);
    setSelectedOperador(null);
    setFechaInicio(new Date());
    setHoraInicio('');
    setDuracion('');
    setCliente('');
  };

  return (
    <div className="space-y-4">
      <SelectMaquinaria 
        maquinarias={maquinarias}
        onSelectMaquinaria={setSelectedMaquinaria}
      />

      <SelectOperador 
        operadores={operadores}
        onSelectOperador={setSelectedOperador}
      />

      <div>
        <label className="block mb-2">Fecha de Servicio</label>
        <Calendar
          mode="single"
          selected={fechaInicio}
          onSelect={(date) => setFechaInicio(date || new Date())}
          className="rounded-md border"
        />
      </div>

      <div>
        <label className="block mb-2">Hora de Inicio</label>
        <Input 
          type="time" 
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2">Duración (Horas)</label>
        <Input 
          type="number" 
          placeholder="Horas de servicio"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2">Nombre del Cliente</label>
        <Input 
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Agendar Servicio
      </Button>
    </div>
  );
};