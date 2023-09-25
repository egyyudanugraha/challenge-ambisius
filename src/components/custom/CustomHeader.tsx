import { HeaderColumnProps } from "@/types"
import { Button } from "../ui/button"
import { ArrowUp, ArrowDown} from "lucide-react"

const CustomHeader = <TData extends object>({ title, column, className }: HeaderColumnProps<TData>) => {
  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      { title }
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 w-4" />
      ) : (
        <ArrowDown className="ml-2 w-4" />
      )}
    </Button>
  )
}

export default CustomHeader