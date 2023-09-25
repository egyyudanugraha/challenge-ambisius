'use client';

import { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { FormatTable, Order, OrderContext } from '@/types';
import { transformData } from '@/lib/utils';

const OrderContext = createContext<OrderContext>({
  orders: [],
  getAllOrderTable: [],
  addOrder: () => {},
  getOrderByTableId: () => ({
    id: 0,
    name: '',
    orders: [],
  }),
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

  const getAllOrderTable = orders.reduce(transformData, []);
  const addOrder = (order: Order[]) => setOrders([...orders, ...order].sort((a, b) => a.tableId - b.tableId))
  const getOrderByTableId = (tableId: number) => orders.filter((order) => order.tableId === tableId).reduce(transformData, [])[0]
  const resetOrder = () => setOrders([])

  return (
    <OrderContext.Provider
      value={{
        orders,
        getAllOrderTable,
        addOrder,
        getOrderByTableId,
        resetOrder,
      }} 
    >{children}</OrderContext.Provider>
  )
}

export default OrderProvider
