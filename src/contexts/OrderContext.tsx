'use client';

import { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Order, OrderContext } from '@/types';
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
  deleteOrderByTableId: () => {},
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
  const deleteOrderByTableId = (tableId: number) => setOrders(orders.filter((order) => order.tableId !== tableId))
  const resetOrder = () => setOrders([])

  return (
    <OrderContext.Provider
      value={{
        orders,
        getAllOrderTable,
        addOrder,
        getOrderByTableId,
        deleteOrderByTableId,
        resetOrder,
      }} 
    >{children}</OrderContext.Provider>
  )
}

export default OrderProvider
