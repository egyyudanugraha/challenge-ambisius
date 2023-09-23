'use client';

import { useState, useEffect } from 'react';
import { Menu } from "@/types"
import { DataTable } from "../data-table"
import { addDataToLocaleStorage, deleteDataById, getDataFromLocalStorage, updateDataById } from '@/lib/utils';
import AddMenu from '../AddMenu';
import { ColumnDef } from '@tanstack/react-table';
import CustomHeader from '../CustomHeader';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const MenuSection = () => {
  const [init, setInit] = useState(true);
  const [menus, setMenus] = useState<Menu[]>([]);

  const handleAddMenu = (menu: Menu) => {
   const { data } = addDataToLocaleStorage('menus', menu);

    setMenus(data)
  }

  const handleUpdateMenu = (menu: Menu) => {
   const { data } = updateDataById('menus', menu);

    setMenus(data)
  }

  const handleDeleteMenu = (id: number) => {
    const { data } = deleteDataById('menus', id);

    setMenus(data);
  }

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
          <EditButton data={row.original} handleAction={handleUpdateMenu} />
          <DeleteButton data={row.original} handleDelete={handleDeleteMenu} />
        </div>
      )
    },
  ];

  useEffect(() => {
    const loadedMenus = getDataFromLocalStorage('menus');
    const refreshMenus = () => setMenus(loadedMenus);
    refreshMenus();
    setInit(false);

    window.addEventListener('storage', refreshMenus)

    return () => window.removeEventListener('storage', refreshMenus)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <AddMenu handleAddMenu={handleAddMenu} />
      <span className="font-semibold text-sm">Daftar menu</span>
      <DataTable columns={columns} data={menus} init={init} />
    </div>
  )
}

export default MenuSection