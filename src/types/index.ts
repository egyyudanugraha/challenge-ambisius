import { Column } from '@tanstack/react-table';

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

export interface HeaderColumnProps<TData> {
  title: string;
  column: Column<TData, unknown>
  className?: string;
}

export interface MenuContext {
  menus: Menu[];
  addMenu: (menu: Menu) => void;
  findMenu: (id: number) => Menu | undefined;
  updateMenu: (id: number, updateMenu: Menu) => void;
  deleteMenu: (id: number) => void;
  resetMenu: () => void;
}

export interface OrderContext {
  orders: Order[];
  getAllOrderTable: FormatTable[];
  addOrder: (order: Order[]) => void;
  getOrderByTableId: (tableId: number) => FormatTable;
  deleteOrderByTableId: (tableId: number) => void;
  resetOrder: () => void;
}

export interface InputOrderProps { 
  handleAddOrder: (order: Order) => void
}

export interface SelectTableProps { 
  count: number;
  selected: number;
  handleSelect: (action: 'tableId' | 'menuId' | 'qty', num: number) => void;
}

export interface DeleteButtonProps {
  data: Menu | Order;
  handleDelete: (id: number) => void;
}

export interface ComboBoxProps {
  name: string; 
  list: Menu[] | FormatTable[];
  selected: number | string;
  handleSelect: (num: number) => void;
}

export interface OrderFormat {
  id: number;
  menuId: number;
  qty: number;
}

export interface FormatTable {
  id: number;
  name: string;
  orders: OrderFormat[];
}