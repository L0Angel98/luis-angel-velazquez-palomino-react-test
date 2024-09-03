
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';



type Item = {
  title: string;
  price: number;
};

const useColumns = () => {
  return useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: 'Titulo',
        cell: (info) => info.getValue(),
        accessorKey: 'title',
       
      },
      {
        header: 'Precio',
        cell: (info) => info.getValue(),
        accessorKey: 'price',
      },
    ],
    []
  );
};

export default useColumns;
