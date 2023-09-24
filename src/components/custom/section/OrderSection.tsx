import { useState } from 'react';
import SelectTable from "../SelectTable"
import ComboBox from '../ComboBox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';
import { generateId } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { useMenu } from '@/contexts/MenuContext';
import DeleteButton from '../DeleteButton';
import { useOrder } from '@/contexts/OrderContext';

const OrderSection = () => {
  const { menus } = useMenu();
  const [selectedTable, setSelectedTable] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [qty, setQty] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const { addOrder } = useOrder()

  const handleAddOrder = () => {
    const order: Order = {
      id: generateId(),
      menuId: selectedMenu,
      tableId: selectedTable,
      qty,
    }

    setOrders((prevOrders) => [...prevOrders, order])
  }

  const handleDeleteOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order: Order) => order.id !== id))
  }

  const handleCheckout = () => {
    addOrder(orders)
    setOrders([]);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className='flex flex-col gap-1 items-center'>
        <span className="font-semibold text-sm">Pilih meja</span>
        <SelectTable count={5} selected={selectedTable} handleSelect={setSelectedTable} />
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <ComboBox handleSelect={setSelectedMenu} />
        <Input 
          autoComplete="off" 
          inputMode="numeric"
          type="number"
          placeholder="Qty"
          className="md:w-[30%]"
          value={qty === 0 ? '' : qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <Button onClick={handleAddOrder}>Tambah</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID Order</TableHead>
            <TableHead className="w-[100px]">No Meja</TableHead>
            <TableHead>Nama menu</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 && orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.tableId}</TableCell>
              <TableCell>{menus.find((menu) => menu.id === order.menuId)?.name}</TableCell>
              <TableCell className="text-right">{order.qty}</TableCell>
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