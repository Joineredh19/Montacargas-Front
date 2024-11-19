import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMaquinaria } from '@/types/maquinaria';
import { IOperador } from '@/types/operador';
import { IServicioAlquiler } from '@/types/alquiler';
import { CalendarioServicios } from '@/components/CalendarioServicios';
import { ServiciosModal } from '@/components/ModalServicios';
import { TablaServicios } from '@/components/TablaServicios';
import GeneralLayout from '@/components/GeneralLayout';

function ServiciosAlquilerPage() {

  // Datos iniciales 
  const [maquinarias] = useState<IMaquinaria[]>([
    { id: 1, nombre: 'Montacargas 1', modelo: '2020', capacidad: 5, estado: 'available' },
    { id: 2, nombre: 'Montacargas 2', modelo: '2019', capacidad: 2, estado: 'in_use' },
    { id: 3, nombre: 'Montacargas 3', modelo: '2015', capacidad: 10, estado: 'maintenance' },
    { id: 4, nombre: 'Montacargas 4', modelo: '2019', capacidad: 4, estado: 'in_use' },
    { id: 5, nombre: 'Montacargas 5', modelo: '2021', capacidad: 3, estado: 'maintenance' },
  ]);

  const [operadores] = useState<IOperador[]>([
    { id: 1, nombre: 'Juan Pérez', especialidad: 'Excavación', disponible: true },
    { id: 2, nombre: 'María González', especialidad: 'Grúa', disponible: true },
    { id: 3, nombre: 'Carlos Rodríguez', especialidad: 'Retroexcavadora', disponible: true }
  ]);

  const [servicios, setServicios] = useState<IServicioAlquiler[]>([]);

  const handleAgregarServicio = (nuevoServicio: Omit<IServicioAlquiler, 'id'>) => {
    const servicioConId = {
      ...nuevoServicio,
      id: servicios.length + 1,
      estado: 'programado'
    };
    setServicios(prevServicios => [...prevServicios, { ...servicioConId, estado: 'Programado' as const }]);
  };

  const handleEditarServicio = (servicioEditado: IServicioAlquiler) => {
    setServicios(servicios.map(s => 
      s.id === servicioEditado.id ? servicioEditado : s
    ));
  };

  const handleCancelarServicio = (id: number) => {
    setServicios(servicios.filter(s => s.id !== id));
  };

  return (
    <div className="bg-orange-50 min-h-full p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Gestión de Alquiler de Maquinaria</CardTitle>
              <ServiciosModal 
                maquinarias={maquinarias}
                operadores={operadores}
                onAgregarServicio={handleAgregarServicio}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border">
                <CardHeader>
                  <CardTitle className="text-orange-800">Servicios Programados</CardTitle>
                </CardHeader>
                <CardContent>
                  <TablaServicios
                    servicios={servicios}
                    onEditarServicio={handleEditarServicio}
                    onCancelarServicio={handleCancelarServicio}
                  />
                </CardContent>
              </Card>

              <CalendarioServicios 
                servicios={servicios}
                onSelectEvent={(servicio) => {
                  console.log('Servicio seleccionado:', servicio);
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

ServiciosAlquilerPage.getLayout = (page: React.ReactElement) => {
    return <GeneralLayout>{page}</GeneralLayout>;
  };
export default ServiciosAlquilerPage;