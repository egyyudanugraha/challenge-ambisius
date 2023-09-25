import { generateArray } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "../ui/card"
import { SelectTableProps } from '@/types';

const SelectTable = ({ count, selected, handleSelect }: SelectTableProps) => {
  return (
    <div className="flex gap-2 w-full justify-evenly flex-wrap">
      { count && generateArray(count, 'Meja').map((meja) => (
        <Card 
          key={meja.id} 
          className={`w-full max-w-[80px] sm:max-w-[120px] cursor-pointer hover:bg-slate-200 ${selected === meja.id && 'bg-slate-900 hover:bg-current'}`} 
          onClick={() => handleSelect("tableId", selected === meja.id ? 0 : meja.id)}
        >
          <CardHeader className="items-center">
            <CardTitle className={`${selected === meja.id && 'text-white'}`}>{meja.id}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default SelectTable