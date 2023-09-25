import { useState, useEffect } from 'react';
import { useOrder } from "@/contexts/OrderContext"
import { Button } from '@/components/ui/button';
import { FormatTable } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMenu } from '@/contexts/MenuContext';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import * as z from "zod"
import ComboBox from "../ComboBox"
import DeleteButton from '../DeleteButton';

const formSchema = z.object({
  tableId: z.number({
    required_error: "Harap pilih meja",
  }).min(1, 'Harap pilih salah satu meja!'),
})

const KasirSection = () => {
  const { findMenu } = useMenu()
  const { getAllOrderTable, getOrderByTableId, deleteOrderByTableId, resetOrder } = useOrder()
  const [print, setPrint] = useState<FormatTable>()

  const chekMenuPrice = (menuId: number) => findMenu(menuId)?.price || 0
  const chekMenuName = (menuId: number) => findMenu(menuId)?.name
  const totalPriceWithQty = (menuId: number, qty: number) => !chekMenuPrice(menuId) ? 'Gratis!' : `Rp. ${(chekMenuPrice(menuId) * qty).toLocaleString('id-ID')},-`

  const totalOrder = print?.orders.reduce((acc, order) => {
    const priceMenu = chekMenuPrice(order.menuId)
    if (priceMenu) return (order.qty * priceMenu) + acc
    return acc
  }, 0)  
  const formatTotal = !totalOrder ? 'Gratis!' : `Rp. ${totalOrder.toLocaleString('id-ID')},-`
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tableId: 0,
    }
  })  
 
  function onSubmit(data: z.infer<typeof formSchema>) {
    const getTable = getOrderByTableId(data.tableId);
    setPrint(getTable)
  }

  const handleRemoveTable = () => {
    setPrint(undefined)
    deleteOrderByTableId(form.getValues('tableId'))
    form.setValue('tableId', 0)
  }

  const handleRemoveAllTable = () => {
    setPrint(undefined)
    resetOrder()
    form.setValue('tableId', 0)
  }

  useEffect(() => {
    setPrint(undefined)
    form.setValue('tableId', 0)
  }, [getOrderByTableId, form])
  

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2">
          <FormField
            control={form.control}
            name="tableId"
            render={() => (
              <FormItem className="w-full">
                <FormControl>
                  <ComboBox 
                    name="meja" 
                    list={getAllOrderTable} 
                    selected={form.getValues('tableId')} 
                    handleSelect={(id: number) => form.setValue('tableId', id)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 w-full flex-col md:flex-row">
            <div className='flex gap-2 w-full md:w-[60%]'>
              <Button type="submit" className='w-full' disabled={!form.watch('tableId')}>Print</Button>
              <DeleteButton className="h-10" data={{ id: form.getValues('tableId')}} handleDelete={handleRemoveTable} disabled={!form.watch('tableId')} />
            </div>
            <div className="flex md:w-[40%]">
              <DeleteButton title="Hapus semua" className="h-10 w-full" data={{ id: 0 }} handleDelete={handleRemoveAllTable} disabled={!getAllOrderTable.length} />
            </div>
          </div>
        </form>
      </Form>

      {print && (
        <Table>
          <TableCaption>Terima kasih sudah makan di <span className="font-semibold">Restoran</span></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama menu</TableHead>
              <TableHead>Harga satuan</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {print.orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{chekMenuName(order.menuId)}</TableCell>
                <TableCell>Rp. {chekMenuPrice(order.menuId).toLocaleString('id-ID')},-</TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell className="text-right">{totalPriceWithQty(order.menuId, order.qty)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-slate-100 text-primary">
            <TableRow>
              <TableCell colSpan={3} className="font-bold text-right">Total</TableCell>
              <TableCell className="text-right font-bold">
                {formatTotal}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>      
      )}
    </div>
  )
}

export default KasirSection