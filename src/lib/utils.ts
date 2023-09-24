import { Menu } from "@/types";
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
