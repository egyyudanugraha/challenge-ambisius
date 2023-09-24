import { Button } from "../ui/button"
import { RefreshCw } from 'lucide-react';
import { useToast } from "../ui/use-toast";
import { useMenu } from "@/contexts/MenuContext";
import { useOrder } from "@/contexts/OrderContext";

const ResetButton = () => {
  const { toast } = useToast()
  const { resetMenu } = useMenu()
  const { resetOrder } = useOrder()

  const handleReset = () => {
    resetOrder();
    resetMenu();
    toast({
      title: 'Berhasil!',
      description: 'Data berhasil direset!',
    })
  }
  return (
    <Button variant='destructive' className="flex gap-1" onClick={handleReset}>
      <RefreshCw className="h-4 w-4"/>
      <span>Reset</span>
    </Button>
  )
}

export default ResetButton