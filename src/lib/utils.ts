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

export const defaultMenu: Menu[] = [
  {
    id: 112233,
    name: 'Ayam Kecap Manis',
    price: 12000,
  },
  {
    id: 123456,
    name: 'Nasi Goreng Spesial',
    price: 20000,
  }
];
