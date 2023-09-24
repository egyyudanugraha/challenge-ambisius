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
 
const formSchema = z.object({
  name: z.string({
    required_error: 'Nama menu harus diisi'
  }).min(3, {
    message: 'Nama menu minimal 3 karakter',
  }),
  price: z.string().optional(),
})

const InputMenu = ({ data }: { data?: Menu }) => {
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
    if (data) {
      updateMenu(data.id, {
        ...data,
        ...values,
        price: Number(price?.split('.').join(''))
      })
    } else {
      addMenu({
        ...values,
        id: generateId(),
        price: Number(price?.split('.').join(''))
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