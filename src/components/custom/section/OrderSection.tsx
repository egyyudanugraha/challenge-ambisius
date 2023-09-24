import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMenu } from '@/contexts/MenuContext';
import { useOrder } from '@/contexts/OrderContext';
import { useToast } from '@/components/ui/use-toast';
import CustomHeader from '../CustomHeader';
import DataTable from '../DataTable';
import InputOrder from '../InputOrder';
import DeleteButton from '../DeleteButton';

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

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'ID Order'
    },
    {
      accessorKey: 'tableId',
      header: ({ column }) => <CustomHeader title='No Meja' column={column} />,
    },
    {
      accessorKey: 'menuId',
      header: ({ column }) => <CustomHeader title='Nama menu' column={column} />,
      cell: ({ row }) => {
        const menu = menus.find((menu) => menu.id === row.getValue('menuId'));
        return menu?.name;
      }
    },
    {
      id: 'satuan',
      header: ({ column }) => <CustomHeader title='Harga satuan' column={column} />,
      cell: ({ row }) => {
        const menu = menus.find((menu) => menu.id === row.getValue('menuId'));
        return `Rp. ${menu?.price.toLocaleString('id-ID')},-`;
      }
    },
    {
      accessorKey: 'qty',
      header: ({ column }) => <CustomHeader title='Qty' column={column} />
    },
    {
      id: 'total',
      header: ({ column }) => <CustomHeader title='Total' column={column} />,
      cell: ({ row }) => {
        const menu = menus.find((menu) => menu.id === row.getValue('menuId'));
        if (!menu) return 'Gratis!'

        return `Rp. ${(menu.price * row.original.qty).toLocaleString('id-ID')},-`
      }
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <DeleteButton data={row.original} handleDelete={handleDeleteOrder} />
        </div>
      )
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <InputOrder handleAddOrder={handleAddOrder} />
      <DataTable columns={columns} data={orders} />
      <Button disabled={!orders.length} onClick={handleCheckout}>Checkout!</Button>
      <span className="text-xs">*Data akan masuk local storage setelah checkout!</span>
    </div>
  )
}

export default OrderSection