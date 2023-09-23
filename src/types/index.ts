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