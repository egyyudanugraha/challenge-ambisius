'use client';

import { useState, useEffect } from 'react';
import { Menu } from "@/types"
import { DataTable } from "../data-table"
import AddMenu from '../AddMenu';
import { ColumnDef } from '@tanstack/react-table';
import CustomHeader from '../CustomHeader';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';
import { useMenu } from '@/contexts/MenuContext';

const MenuSection = () => {
  const [init, setInit] = useState(true);
  const { menus } = useMenu();

  useEffect(() => {
    setInit(false)
  }, [])

  const columns: ColumnDef<Menu>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <CustomHeader title='Menu' column={column} />,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <CustomHeader title='Harga' column={column} />,
      cell: ({ row }) => {
        const parsedSalary = Number(row.getValue('price')).toLocaleString('id-ID')
        return `Rp. ${parsedSalary},-`
      }
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <EditButton data={row.original} />
          <DeleteButton data={row.original} />
        </div>
      )
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <AddMenu  />
      <span className="font-semibold text-sm">Daftar menu</span>
      <DataTable columns={columns} data={menus} init={init} />
    </div>
  )
}

export default MenuSection