'use client';

import { resetLocaleStorage } from "@/lib/utils";
import { Button } from "../ui/button"
import { RefreshCw } from 'lucide-react';

const ResetButton = () => {
  return (
    <Button variant='destructive' className="flex gap-1" onClick={() => resetLocaleStorage()}>
      <RefreshCw className="h-4 w-4"/>
      <span>Reset</span>
    </Button>
  )
}

export default ResetButton