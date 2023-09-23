import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react';
import { DeleteButtonProps } from "@/types"
import { Button } from "../ui/button";

const DeleteButton = ({ data, handleDelete }: DeleteButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className="h-8">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin akan menghapus menu 
            <span className="font-semibold">{` ${data.name} `}</span>
            dengan ID 
            <span className="font-semibold">{` ${data.id}`}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button variant='destructive' asChild>
            <AlertDialogAction onClick={() => handleDelete(data.id)}>Ya, Hapus!</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton