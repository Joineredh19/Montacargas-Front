// hooks/useMaquinariaCrud.ts
import { IMaquinaria } from '@/types/maquinaria';
import { useState } from 'react';

export const useMaquinariaCrud = () => {
  const [Maquinarias, setMaquinarias] = useState<IMaquinaria[]>([]);
  const [currentMaquinaria, setCurrentMaquinaria] = useState<Partial<IMaquinaria>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (data: Partial<IMaquinaria>) => {
    if (data.id) {
      setMaquinarias(prev => prev.map(f => 
        f.id === data.id ? { ...f, ...data } as IMaquinaria : f
      ));
    } else {
      const newMaquinaria = {
        ...data,
        id: Date.now()
      } as IMaquinaria;
      setMaquinarias(prev => [...prev, newMaquinaria]);
    }
    handleCancel();
  };

  const handleEdit = (Maquinaria: IMaquinaria) => {
    setCurrentMaquinaria(Maquinaria);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setMaquinarias(prev => prev.filter(f => f.id !== id));
  };

  const handleCancel = () => {
    setCurrentMaquinaria({});
    setIsFormOpen(false);
  };

  return {
    Maquinarias,
    currentMaquinaria,
    isFormOpen,
    setIsFormOpen,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
};