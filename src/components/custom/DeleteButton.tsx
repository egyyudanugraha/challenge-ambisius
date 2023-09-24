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
import { useToast } from "../ui/use-toast";

const DeleteButton = ({ data, handleDelete }: DeleteButtonProps) => {
  const { toast } = useToast()

  const handleAction = () => {
    handleDelete(data.id);
    toast({
      title: 'Berhasil!',
      description: 'Data berhasil dihapus!',
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className="h-8">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin akan menghapus data dengan ID 
            <span className="font-semibold">{` ${data.id}`}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button variant='destructive' asChild>
            <AlertDialogAction onClick={handleAction}>Ya, Hapus!</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton