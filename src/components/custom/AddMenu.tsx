import { useState } from 'react'
import { Input } from '../ui/input';
import { AddMenuProps } from '@/types';
import { Button } from '../ui/button';

const AddMenu = ({ handleAddMenu }: AddMenuProps) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const handleAction = () => {
    handleAddMenu({
      id: +new Date(),
      name,
      price: Number(price?.split('.').join(''))
    })

    setName('')
    setPrice('')
  }

  return (
    <div>
      <span className="font-semibold text-sm">Tambahkan menu</span>
      <div className="flex flex-col md:flex-row gap-2">
        <Input 
          name="name" 
          placeholder="Nama menu" 
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input 
          name="price"
          className="md:w-[30%]"
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
        <Button 
          onClick={handleAction}
          disabled={!name.length || price.length < 4}
        >Simpan</Button>
      </div>
    </div>
  )
}

export default AddMenu