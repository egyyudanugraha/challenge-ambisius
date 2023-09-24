"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn, getDataFromLocalStorage } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Menu } from "@/types"

const ComboBox = () => {
  const [open, setOpen] = useState(false)
  const [menus, setMenus] = useState<Menu[]>([])
  const [value, setValue] = useState("")

  useEffect(() => {
    const getMenus = getDataFromLocalStorage('menus');
    setMenus(getMenus);
  }, [])
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? menus.find((menu) => menu.name.toLowerCase() === value)?.name
            : "Pilih menu..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari menu..." />
          <CommandEmpty>Menu tidak ditemukan.</CommandEmpty>
          <CommandGroup>
            {menus.map((menu) => (
              <CommandItem
                key={menu.id}
                onSelect={(currentValue) => {
                  setValue(currentValue.toLowerCase() === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === menu.name.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                {menu.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBox