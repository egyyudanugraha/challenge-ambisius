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

export interface AddMenuProps {
  handleAddMenu: (data: Menu) => void;
}

export interface DeleteButtonProps {
  data: Menu;
  handleDelete: (id: number) => void;
}