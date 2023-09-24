import { Dispatch, SetStateAction } from 'react';
import { Column } from "@tanstack/react-table";

export interface Menu {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  tableId: number;
  menuId: number
  qty: number;
}

export interface HeaderColumnProps {
  title: string;
  column: Column<Menu, unknown>;
}

export interface MenuContext {
  menus: Menu[];
  addMenu: (menu: Menu) => void;
  updateMenu: (id: number, updateMenu: Menu) => void;
  deleteMenu: (id: number) => void;
  resetMenu: () => void;
}

export interface OrderContext {
  orders: Order[];
  addOrder: (order: Order[]) => void;
  resetOrder: () => void;
}

export interface SelectTableProps { 
  count: number;
  selected: number;
  handleSelect: Dispatch<SetStateAction<number>>;
}

export interface DeleteButtonProps {
  data: Menu | Order;
  handleDelete: (id: number) => void;
}

export interface ComboBoxProps { 
  handleSelect: Dispatch<SetStateAction<number>>;
}