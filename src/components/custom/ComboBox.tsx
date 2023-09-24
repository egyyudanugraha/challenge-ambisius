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
import { ComboBoxProps } from "@/types"
import { useMenu } from "@/contexts/MenuContext"

const ComboBox = ({ selected, handleSelect }: ComboBoxProps) => {
  const { menus } = useMenu()
  const [open, setOpen] = useState(false)
    
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected
            ? menus.find((menu) => menu.id === selected)?.name
            : "Pilih menu..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput placeholder="Cari menu..." />
          <CommandEmpty>Menu tidak ditemukan.</CommandEmpty>
          <CommandGroup className="w-full">
            {menus.map((menu) => (
              <CommandItem
                key={menu.id}
                onSelect={(currentValue) => {
                  handleSelect("menuId", menu.id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected === menu.id ? "opacity-100" : "opacity-0"
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