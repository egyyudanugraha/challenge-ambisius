import { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMenu } from '@/contexts/MenuContext';
import { Menu } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import * as z from "zod"
import { generateId } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
 
const formSchema = z.object({
  name: z.string({
    required_error: 'Nama menu harus diisi'
  }).min(3, {
    message: 'Nama menu minimal 3 karakter',
  }),
  price: z.string().optional(),
})

const InputMenu = ({ data }: { data?: Menu }) => {
  const { toast } = useToast()
  const [price, setPrice] = useState(data?.price.toLocaleString('id-ID') ?? '')
  const { addMenu, updateMenu } = useMenu();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? '',
      price: data?.price.toLocaleString('id-ID') ?? ''
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const toastAction = toast({
      title: 'Memproses...',
      description: 'Data sedang diproses'
    });

    if (data) {
      updateMenu(data.id, {
        ...data,
        ...values,
        price: Number(price?.split('.').join(''))
      })

      toastAction.update({
        id: toastAction.id,
        title: 'Berhasil!',
        description: 'Data menu berhasil diubah'
      })
    } else {
      addMenu({
        ...values,
        id: generateId(),
        price: Number(price?.split('.').join(''))
      })

      toastAction.update({
        id: toastAction.id,
        title: 'Berhasil!',
        description: 'Data menu berhasil disimpan'
      })
    }
    form.setValue('name', '')
    form.setValue('price', '')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input  placeholder="Nama menu" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="md:w-[30%]">
              <FormControl>
                <Input 
                  {...field}
                  placeholder="Harga menu"
                  inputMode="numeric"
                  autoComplete="off"
                  value={price === '0' ? '' : price}
                  onChange={(e) => {
                    const parsedNumber = Number(e.target.value.split('.').join(''));
                    if (Number.isNaN(parsedNumber)) return;
                    
                    setPrice(parsedNumber.toLocaleString('id-ID'))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.getValues('name').length}>Simpan</Button>
      </form>
    </Form>
  )
}

export default InputMenu