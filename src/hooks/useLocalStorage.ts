import { getDataFromLocalStorage, setDataToLocalStorage } from '@/lib/utils';
import { useState, useEffect } from 'react'

const useLocalStorage = <T>(key: string, initialState: T[]): [T[], React.Dispatch<React.SetStateAction<T[]>>] => {
  const [storage, setStorage] = useState<T[]>(initialState);
  const [init, setInit] = useState(true);

  useEffect(() => {
    const dataFromStorage = getDataFromLocalStorage(key)    
    if (dataFromStorage) setStorage(dataFromStorage);
    setInit(false)
  }, []);

  useEffect(() => {
    if (!init) setDataToLocalStorage(key, storage);
    
  }, [storage]);

  return [storage, setStorage];
}

export default useLocalStorage