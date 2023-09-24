import ComboBox from './ComboBox'
import { Input } from '../ui/input'
import { InputOrderProps } from '@/types'
import { generateId } from '@/lib/utils'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import SelectTable from './SelectTable'
import * as z from "zod"

const InputOrder = ({ handleAddOrder }: InputOrderProps) => {
  const FormSchema = z.object({
    tableId: z.number({
      required_error: "Harap pilih meja",
    }).min(1, 'Harap pilih salah satu meja!'),
    menuId: z.number({
      required_error: "Harap pilih menu",
    }).min(1, 'Harap pilih salah satu menu!'),
    qty: z.number({
      required_error: "Harap masukan kuantitas",
    }).min(1, 'Kuantitas minimal 1'),
  })
 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {

      qty: 0,
    }
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleAddOrder({
      ...data,
      id: generateId(),
    })

    form.setValue("menuId", 0)
    form.setValue("qty", 0)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="tableId"
          render={() => (
            <FormItem className='flex flex-col gap-1 items-center'>
              <FormControl>
                <SelectTable count={5} selected={form.getValues('tableId')} handleSelect={form.setValue} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 flex-col sm:flex-row">
          <FormField
            control={form.control}
            name="menuId"
            render={() => (
              <FormItem className="w-full">
                <FormControl>
                  <ComboBox selected={form.getValues('menuId')} handleSelect={form.setValue} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <FormItem className="md:w-[30%]">
                <FormControl>
                  <Input 
                    {...field}
                    autoComplete="off" 
                    inputMode="numeric"
                    type="number"
                    placeholder="Qty"
                    min={1}
                    value={form.getValues('qty') === 0 ? '' : form.getValues('qty')}
                    onChange={(e) => form.setValue("qty", Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Tambah</Button>
        </div>
      </form>
    </Form>
  )
}

export default InputOrder