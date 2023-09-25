'use client';

import { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Menu, MenuContext } from '@/types';
import { defaultMenu } from '@/lib/utils';

const MenuContext = createContext<MenuContext>({
  menus: [],
  addMenu: () => {},
  findMenu: () => ({
    id: 0,
    name: '',
    price: 0,
  }),
  updateMenu: () => {},
  deleteMenu: () => {},
  resetMenu: () => {},
});

export const useMenu = () => {
  const context = useContext(MenuContext);
  if(!context) throw new Error('useMenu must be used within a MenuProvider')
  
  return context;
}

const MenuProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [menus, setMenus] = useLocalStorage<Menu>('menus', []);

  const addMenu = (menu: Menu) => setMenus([...menus, menu])
  const findMenu = (id: number) => menus.find((menu) => menu.id === id);
  const updateMenu = (id: number, updateMenu: Menu) => setMenus((prevMenus) =>
    prevMenus.map((menu: Menu) => menu.id === id ? {...menu, ...updateMenu} : menu),
  )

  const deleteMenu = (id: number) => setMenus((prevMenus) => prevMenus.filter((menu: Menu) => menu.id !== id))

  const resetMenu = () => setMenus(defaultMenu)

  return (
    <MenuContext.Provider
      value={{
        menus,
        addMenu,
        findMenu,
        updateMenu,
        deleteMenu,
        resetMenu,
      }} 
    >{children}</MenuContext.Provider>
  )
}

export default MenuProvider
