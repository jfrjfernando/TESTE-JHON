/**
 * @deprecated
 */

import { useState } from "preact/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "../../lib/utils";
import { CardBaseType, IdType } from "@/models/card.model";
import ALL_CARDS from "@/models/data/cards";
import { findCardByName } from "@/services/finder";

const searchValues: {
  value: CardBaseType["name"];
  label: string;
}[] = ALL_CARDS.map((card) => ({
  value: card.name,
  label: card.name,
}));

export function SearchCards({
  onSelect,
}: {
  onSelect: (card: CardBaseType) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-96 justify-between"
          aria-label={"Search cards"}
        >
          Search card...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder="Search card..." className="h-9" />
          <CommandList>
            <CommandEmpty>No card found.</CommandEmpty>
            <CommandGroup>
              {searchValues.map((card) => (
                <CommandItem
                  key={card.value}
                  value={card.value}
                  onSelect={(currentValue) => {
                    if (!currentValue) {
                      return;
                    }

                    const findCard = findCardByName(currentValue as IdType);

                    if (!findCard) {
                      return;
                    }

                    onSelect(findCard);
                    setOpen(false);
                  }}
                >
                  {card.label}
                  <Check className={cn("ml-auto")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
