'use client';

import { useState, useEffect } from 'react';
import { Menu } from "@/types"
import { DataTable } from "../datatable/data-table"
import { columns } from "../datatable/columns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getDataFromLocalStorage, setDataToLocalStorage } from '@/lib/utils';

const MenuSection = () => {
  const [init, setInit] = useState(true);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const handleAddMenu = () => {
    const id = +new Date();
    const newMenu: Menu = {
      id,
      name,
      price: Number(price?.split('.').join(''))
    }

    const { data } = setDataToLocalStorage('menus', newMenu);

    setMenus(data);
    setName('');
    setPrice('');
  }

  useEffect(() => {
    const loadedMenus = getDataFromLocalStorage('menus');
    setMenus(loadedMenus);
    setInit(false);
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-sm">Tambahkan menu</span>
      <div className="flex gap-2">
        <Input name="name" placeholder="Nama menu" autoComplete="off" onChange={(e) => setName(e.target.value)} />
        <Input 
          name="price"
          className="w-[30%]"
          placeholder="Harga"
          autoComplete="off"
          inputMode="numeric"
          value={price === '0' ? '' : price}
          onChange={(e) => {
            const parsedNumber = Number(e.target.value.split('.').join(''));
            if (Number.isNaN(parsedNumber)) return;
            
            setPrice(parsedNumber.toLocaleString('id-ID'))
          }}
        />
        <Button onClick={handleAddMenu}>Simpan</Button>
      </div>

      <span className="font-semibold text-sm">Daftar menu</span>
      <DataTable columns={columns} data={menus} init={init} />
    </div>
  )
}

export default MenuSection