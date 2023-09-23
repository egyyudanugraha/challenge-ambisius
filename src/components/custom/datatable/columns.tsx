import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown} from "lucide-react"
import { HeaderColumnProps, Menu } from '@/types';
import { Column, ColumnDef } from '@tanstack/react-table';

const customHeader = ({ title, column }: HeaderColumnProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      { title }
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: ({ column }) => customHeader({
      title: 'Menu',
      column, 
    }),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => customHeader({
      title: 'Harga',
      column, 
    }),
    cell: ({ row }) => {
      const parsedSalary = Number(row.getValue('price')).toLocaleString('id-ID')
      return `Rp. ${parsedSalary},-`
    }
  },
]