import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMenu } from '@/contexts/MenuContext';
import DeleteButton from '../DeleteButton';
import { useOrder } from '@/contexts/OrderContext';
import InputOrder from '../InputOrder';
import { useToast } from '@/components/ui/use-toast';

const OrderSection = () => {
  const { toast } = useToast()
  const { menus } = useMenu();
  const { addOrder } = useOrder()
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order])
  }

  const handleDeleteOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order: Order) => order.id !== id))
  }

  const handleCheckout = () => {
    addOrder(orders)
    setOrders([]);

    toast({
      title: 'Berhasil!',
      description: 'Pesanan berhasil di-checkout!'
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <InputOrder handleAddOrder={handleAddOrder} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID Order</TableHead>
            <TableHead className="w-[100px]">No Meja</TableHead>
            <TableHead>Nama menu</TableHead>
            <TableHead>Harga satuan</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 && orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.tableId}</TableCell>
              <TableCell>{menus.find((menu) => menu.id === order.menuId)?.name}</TableCell>
              <TableCell>{`Rp. ${menus.find((menu) => menu.id === order.menuId)?.price.toLocaleString('id-ID')},-`}</TableCell>
              <TableCell className="text-right">{order.qty}</TableCell>
              <TableCell className="text-right">{`Rp. ${((menus.find((menu) => menu.id === order.menuId)?.price || 0) * order.qty).toLocaleString('id-ID')},-`}</TableCell>
              <TableCell className="text-right">
                <DeleteButton data={order} handleDelete={handleDeleteOrder} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button disabled={!orders.length} onClick={handleCheckout}>Checkout!</Button>
    </div>
  )
}

export default OrderSection