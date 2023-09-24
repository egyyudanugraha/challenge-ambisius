import { useOrder } from "@/contexts/OrderContext"
import CardTable from "../CardTable"

const DapurSection = () => {
  const { getAllOrderTable } = useOrder()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap justify-evenly">
        { getAllOrderTable && getAllOrderTable.map(order => (
          <CardTable key={order.tableId} data={order} />
        ))}
      </div>
      <span className="text-xs items-start">*Setiap order dengan menu yang sama, maka akan diakumulasikan kuantitasnya</span>
    </div>
  )
}

export default DapurSection