import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from 'lucide-react'
import { Button } from "../ui/button"
import { Menu } from '@/types';
import InputMenu from './InputMenu';


const EditButton = ({ data }: { data: Menu }) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className="h-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ubah Menu</DialogTitle>
        </DialogHeader>
        <InputMenu data={data} />
      </DialogContent>
    </Dialog>
  )
}

export default EditButton