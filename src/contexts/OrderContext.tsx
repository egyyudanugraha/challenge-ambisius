'use client';

import { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Order, OrderContext } from '@/types';

const OrderContext = createContext<OrderContext>({
  orders: [],
  addOrder: () => {},
  resetOrder: () => {},
});

export const useOrder = () => {
  const context = useContext(OrderContext);
  if(!context) throw new Error('useOrder must be used within a OrderProvider')
  
  return context;
}

const OrderProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [orders, setOrders] = useLocalStorage<Order>('orders', []);

  const addOrder = (order: Order[]) => setOrders([...orders, ...order])
  const resetOrder = () => setOrders([])

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        resetOrder,
      }} 
    >{children}</OrderContext.Provider>
  )
}

export default OrderProvider
