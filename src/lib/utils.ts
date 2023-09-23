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

export const addDataToLocaleStorage = (key: string, data: any) => {
  const currentData = getDataFromLocalStorage(key);
  const updateData = [...currentData, data];
  setDataToLocalStorage(key, updateData);

  return {
    status: 'success',
    title: 'Sukses!',
    message: `Data ${key} berhasil disimpan!`,
    data: updateData
  }
}

export const getDataByIdFromLocalStorage = (key: string, id: number) => {
  const data = getDataFromLocalStorage(key);

  const result = data.find((item: any) => item.id === id);

  if (!result) {
    return {
      status: 'error',
      title: 'Opps!',
      message: 'Data tidak ditemukan!',
    }
  }

  return {
    status: 'success',
    title: 'Sukses!',
    message: 'Data ditemukan!',
    data: result,
  } 
}

export const updateDataById = (key: string, data: any) => {
  const currentData = getDataFromLocalStorage(key);
  const checkData = getDataByIdFromLocalStorage(key, data.id);

  if (checkData.status === 'error') return checkData;

  const updatedData = currentData.map((item: any) => {
    if(item.id === data.id) {
      return { ...data }
    }
    return item;
  });
  setDataToLocalStorage(key, updatedData);

  return {
    status: 'success',
    title: 'Sukses!',
    message: 'Data berhasil diubah!',
    data: updatedData,
  } 
}

export const deleteDataById = (key: string, id: number) => {
  const currentData = getDataFromLocalStorage(key);
  const checkData = getDataByIdFromLocalStorage(key, id);

  if (checkData.status === 'error') return checkData;

  const filteredData = currentData.filter((item: any) => item.id !== id);
  setDataToLocalStorage(key, filteredData);

  return {
    status: 'success',
    title: 'Sukses!',
    message: 'Data berhasil dihapus!',
    data: filteredData,
  } 
}

export const resetLocaleStorage = () => {
  const defaultData: Menu[] = [
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

  setDataToLocalStorage('orders', []);
  setDataToLocalStorage('menus', defaultData);
  window.dispatchEvent(new Event('storage'));

  return {
    status: 'success',
    title: 'Sukses!',
    message: 'Data berhasil direset!',
  } 
}