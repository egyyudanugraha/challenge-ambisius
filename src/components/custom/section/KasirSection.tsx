import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useOrder } from "@/contexts/OrderContext"
import { Button } from '@/components/ui/button';
import { FormatTable } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMenu } from '@/contexts/MenuContext';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import ComboBox from "../ComboBox"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  tableId: z.number({
    required_error: "Harap pilih meja",
  }).min(1, 'Harap pilih salah satu meja!'),
})

const KasirSection = () => {
  const [print, setPrint] = useState<FormatTable | null>()
  const { getAllOrderTable, getOrderByTableId } = useOrder()
  const { menus } = useMenu()
  
  
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

  const handleReset = () => {
    setPrint(null)
    form.setValue('tableId', 0);
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
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
          <Button type="submit" className='w-[20%]'>Print</Button>
          {print && (
            <Button variant="destructive" onClick={handleReset}>
              <RefreshCw className="h-4 w-4"/>
            </Button>
          )}
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
                <TableCell className="font-medium">{menus.find((menu) => menu.id === order.menuId)?.name}</TableCell>
                <TableCell>Rp. {(menus.find((menu) => menu.id === order.menuId)?.price)?.toLocaleString('id-ID')},-</TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell className="text-right">{(menus.find((menu) => menu.id === order.menuId)?.price || 0) === 0 ? 'Gratis!' : `Rp. ${((menus.find((menu) => menu.id === order.menuId)?.price || 0) * order.qty).toLocaleString('id-ID')},-`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-slate-100 text-primary">
            <TableRow>
              <TableCell colSpan={3} className="font-bold text-right">Total</TableCell>
              <TableCell className="text-right font-bold">
                Rp. {print.orders.reduce((acc, order) => ((menus.find((menu) => menu.id === order.menuId)?.price || 0) * order.qty) + acc, 0).toLocaleString('id-ID')},-
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>      
      )}
    </div>
  )
}

export default KasirSection