import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from 'lucide-react'
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { EditButtonProps } from '@/types';


const EditButton = ({ data, handleAction }: EditButtonProps) => {
  const [name, setName] = useState(data.name)
  const [price, setPrice] = useState(data.price.toLocaleString('id-ID'))

  const handleUpdate = () => {
    handleAction({
      id: data.id,
      name,
      price: Number(price?.split('.').join(''))
    })

    setName('')
    setPrice('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className="h-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ubah Menu</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama menu
            </Label>
            <Input 
              name="name" 
              className="col-span-3"
              placeholder="Nama menu" 
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Harga
            </Label>
            <Input 
              name="price"
              className="col-span-3"
              placeholder="Harga"
              autoComplete="off"
              inputMode="numeric"
              value={price === '0' ? '' : price}
              onChange={(e) => {
                const parsedNumber = Number(e.target.value.split('.').join(''));
                if (Number.isNaN(parsedNumber)) return;
                
                setPrice(parsedNumber.toLocaleString('id-ID'))
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Simpan perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditButton