import { FormatTable, Menu, Order } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDataFromLocalStorage = (key: string) => {
  const dataLocalStorage = localStorage.getItem(key);  
  if (!dataLocalStorage) return [];

  return JSON.parse(dataLocalStorage);
}

export const setDataToLocalStorage = (key: string, data: any) => {
  const convertToString = JSON.stringify(data);
  localStorage.setItem(key, convertToString);
}

export const generateId = () => Number(String(+new Date()).substring(4, 11))
export const transformData = (accumulator: FormatTable[], currentOrder: Order) => {
  const { id, tableId, menuId, qty } = currentOrder;
  
  const checkOrder = accumulator.find((table) => table.tableId === tableId);
  const checkOrderMenu = checkOrder?.orders.find((order) => order.menuId === menuId);

  if (checkOrderMenu) {
    checkOrderMenu.qty += qty;
  } else if (checkOrder) {
    checkOrder.orders.push({ id, menuId, qty });
  } else {
    accumulator.push({
      tableId,
      orders: [{ id, menuId, qty }]
    });
  }
  
  return accumulator;
}

export const defaultMenu: Menu[] = [
  {
    id: 5319436,
    name: 'Ayam Kecap Manis',
    price: 12000,
  },
  {
    id: 5319437,
    name: 'Nasi Goreng Spesial',
    price: 20000,
  }
];
