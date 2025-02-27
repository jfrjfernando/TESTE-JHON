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
import { CardBaseType } from "@/models/card.model";
import ALL_CARDS from "@/models/data/cards";
import { appendUrlPath } from "@/utils/path";
import { useRouter } from "preact-router";

const searchValues: {
  value: CardBaseType["name"];
  label: string;
}[] = ALL_CARDS.map((card) => ({
  value: card.name,
  label: card.name,
}));

export function SearchBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [_, push] = useRouter();

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
                <a
                  href={appendUrlPath(
                    `/cards/${encodeURIComponent(card.value)}`
                  )}
                  onClick={() => setOpen(false)}
                >
                  <CommandItem
                    key={card.value}
                    value={card.value}
                    onSelect={() => {
                      push(
                        appendUrlPath(
                          `/cards/${encodeURIComponent(card.value)}`
                        )
                      );

                      setOpen(false);
                    }}
                  >
                    {card.label}
                  </CommandItem>
                </a>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
