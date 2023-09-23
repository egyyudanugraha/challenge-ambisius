'use client';

import { resetLocaleStorage } from "@/lib/utils";
import { Button } from "../ui/button"
import { RefreshCw } from 'lucide-react';
import { useToast } from "../ui/use-toast";

const ResetButton = () => {
  const { toast } = useToast()

  const handleReset = () => {
    const { title, message } = resetLocaleStorage();
    toast({
      title,
      description: message,
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