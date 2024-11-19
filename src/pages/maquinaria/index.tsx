import React, { useState } from 'react';
import GeneralLayout from '@/components/GeneralLayout';
import { IMaquinaria } from '@/types/maquinaria';
import { MaquinariaHeader } from '@/components/MaquinariaHeader';
import { MaquinariaForm } from '@/components/MaquinariaForm';
import { MaquinariaTable } from '@/components/MaquinariaTable';

const MaquinariasPage = () => {
  const [maquinarias, setMaquinarias] = useState<IMaquinaria[]>([
    { 
      id: 1, 
      nombre: 'Montacargas Toyota', 
      modelo: 'FD30', 
      capacidad: 3000, 
      estado: 'available',
      proximoServicio: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    { 
      id: 2, 
      nombre: 'Montacargas Hyster', 
      modelo: 'FD24', 
      capacidad: 2500, 
      estado: 'in_use',
      proximoServicio: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMaquinaria, setCurrentMaquinaria] = useState<IMaquinaria | null>(null);

  const handleSubmit = (maquinaria: IMaquinaria) => {
    if (currentMaquinaria?.id) {
      setMaquinarias(prev => 
        prev.map(m => m.id === currentMaquinaria.id ? {...maquinaria, id: currentMaquinaria.id} : m)
      );
    } else {
      setMaquinarias(prev => [...prev, { ...maquinaria, id: prev.length + 1 }]);
    }
    setIsFormOpen(false);
    setCurrentMaquinaria(null);
  };

  const handleEdit = (maquinaria: IMaquinaria) => {
    setCurrentMaquinaria(maquinaria);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setMaquinarias(prev => prev.filter(m => m.id !== parseInt(id)));
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <MaquinariaHeader 
        isFormOpen={isFormOpen}
        onAddNew={() => {
          setIsFormOpen(true);
          setCurrentMaquinaria(null);
        }} 
      />
      <div className="p-6">
        {isFormOpen ? (
          <MaquinariaForm
            currentMaquinaria={currentMaquinaria}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : (
          <MaquinariaTable
            maquinarias={maquinarias}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

MaquinariasPage.getLayout = (page: React.ReactElement) => {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default MaquinariasPage;