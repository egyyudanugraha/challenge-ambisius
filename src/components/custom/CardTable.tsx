import { FormatTable } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useMenu } from "@/contexts/MenuContext"

const CardTable = ({ data }: { data: FormatTable }) => {
  const { menus } = useMenu()

  return (
    <Card className="w-full sm:w-[250px]">
      <CardHeader className="flex items-center">
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.orders.map((order) => (
          <div key={order.id} className="flex gap-2">
            <div>{order.qty}x</div>
            <div className="break-all">{menus.find((menu) => menu.id === order.menuId)?.name}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default CardTable