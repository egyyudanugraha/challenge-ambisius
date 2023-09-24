import { Card, CardHeader, CardTitle } from "../ui/card"
import { SelectTableProps } from '@/types';

const SelectTable = ({ count, selected, handleSelect }: SelectTableProps) => {
  return (
    <div className="flex gap-2 w-full justify-evenly flex-wrap">
      { count && Array.from({ length: count }, (_, index) => index + 1).map((num) => (
        <Card 
          key={num} 
          className={`w-full max-w-[80px] sm:max-w-[120px] cursor-pointer hover:bg-slate-200 ${selected === num && 'bg-slate-900 hover:bg-current'}`} 
          onClick={() => handleSelect("tableId", selected === num ? 0 : num)}
        >
          <CardHeader className="items-center">
            <CardTitle className={`${selected === num && 'text-white'}`}>{num}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default SelectTable