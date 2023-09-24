'use client';

import { Menu } from "@/types"
import { ColumnDef } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { useMenu } from '@/contexts/MenuContext';
import DataTable from "../DataTable"
import InputMenu from '../InputMenu';
import CustomHeader from '../CustomHeader';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const MenuSection = () => {
  const [init, setInit] = useState(true);
  const { menus, deleteMenu } = useMenu();

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
          <DeleteButton data={row.original} handleDelete={deleteMenu} />
        </div>
      )
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-sm">Tambahkan menu</span>
      <InputMenu  />
      <span className="font-semibold text-sm">Daftar menu</span>
      <DataTable columns={columns} data={menus} init={init} />
    </div>
  )
}

export default MenuSection