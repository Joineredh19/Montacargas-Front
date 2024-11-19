import React from 'react';
import { PlusCircle } from 'lucide-react';

interface MaquinariaHeaderProps {
  isFormOpen: boolean;
  onAddNew: () => void;
}

export const MaquinariaHeader: React.FC<MaquinariaHeaderProps> = ({ 
  isFormOpen, 
  onAddNew 
}) => (
  <div className="bg-orange-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
    <h2 className="text-xl font-bold">Montacargas</h2>
    {!isFormOpen && (
      <button 
        onClick={onAddNew}
        className="flex items-center bg-white text-orange-600 px-4 py-2 rounded-md hover:bg-orange-50 transition-colors"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Nuevo Montacargas
      </button>
    )}
  </div>
);
