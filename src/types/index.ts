import { Column } from "@tanstack/react-table";

export interface Menu {
  id: number;
  name: string;
  price: number;
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