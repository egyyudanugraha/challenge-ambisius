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
  const currentData = getDataFromLocalStorage(key);
  const updateData = [...currentData, data];
  const convertToString = JSON.stringify(updateData);
  localStorage.setItem(key, convertToString);

  return {
    status: 'success',
    message: `Data ${key} berhasil disimpan!`,
    data: updateData
  }
}