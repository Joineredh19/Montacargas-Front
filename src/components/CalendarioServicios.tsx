import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { 
  format, 
  parse, 
  startOfWeek, 
  getDay 
} from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IServicioAlquiler } from '@/types/alquiler';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const locales = {
  'es': es
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

interface CalendarioServiciosProps {
  servicios: IServicioAlquiler[];
  onSelectEvent?: (event: IServicioAlquiler) => void;
}

export const CalendarioServicios: React.FC<CalendarioServiciosProps> = ({ 
  servicios, 
  onSelectEvent 
}) => {
  // Transform servicios into calendar events
  const events = servicios.map(servicio => ({
    ...servicio,
    title: `${servicio.maquinaria.nombre} - ${servicio.operador.nombre}`,
    start: new Date(servicio.fechaInicio),
    end: new Date(servicio.fechaFin),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendario de Servicios</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día"
          }}
          style={{ height: 500 }}
          onSelectEvent={onSelectEvent}
        />
      </CardContent>
    </Card>
  );
};