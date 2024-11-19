// components/ui/data-table/index.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showActions?: boolean;
}

export function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete,
  showActions = true 
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th key={String(column.accessorKey)} className="p-2 text-left">
                {column.header}
              </th>
            ))}
            {showActions && <th className="p-2 text-left">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td key={String(column.accessorKey)} className="p-2">
                  {column.cell 
                    ? column.cell(item)
                    : String(item[column.accessorKey])
                  }
                </td>
              ))}
              {showActions && (
                <td className="p-2">
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEdit(item)}
                      >
                        Editar
                      </Button>
                    )}
                    {onDelete && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onDelete(item)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}