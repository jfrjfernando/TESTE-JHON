import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CornerRightDown } from "lucide-react";
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
import { FixedSizeList } from "react-window";
import { cn } from "@/lib/utils";
import { padToThreeDigits } from "@/utils/strings";

const searchValues: {
  value: CardBaseType["name"];
  label: string;
}[] = ALL_CARDS.map((card) => ({
  value: card.name,
  label: card.name,
}));

export function SearchBar({
  children,
  clickType = "anchor",
  onSelect,
}: React.PropsWithChildren<{
  clickType?: "anchor" | "custom";
  onSelect?: (cardName: string) => void;
}>) {
  const [open, setRawOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const ref = useRef<HTMLButtonElement>(null);
  const [containerWidth, setContainerWidth] = useState(-1);

  useEffect(() => {
    if (!ref.current) return;

    const updateWidth = () => {
      if (ref.current) {
        setContainerWidth(ref.current.getBoundingClientRect().width);
      }
    };

    const observer = new ResizeObserver(updateWidth);
    observer.observe(ref.current);

    updateWidth();

    return () => observer.disconnect();
  }, []);

  const currentValues = useMemo(
    () => searchValues.filter((each) => each.value.includes(search)),
    [search]
  );

  const setOpen = useCallback(
    (open: boolean) => {
      if (!open) {
        setSearch("");
      }

      setRawOpen(open);
    },
    [setRawOpen]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children || (
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className={`w-[374px] max-sm:w-[120px] justify-between`}
            aria-label={"Search cards"}
            ref={ref}
          >
            Search card...
            <CornerRightDown className="opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className={`w-[${containerWidth}px] p-0 m-0"`}>
        <Command>
          <CommandInput
            placeholder="Search card..."
            className={cn("h-9")}
            onValueChange={(search) => {
              setSearch(search);
            }}
            width={containerWidth / 4}
            style={{
              width: containerWidth / 2,
            }}
          />
          <CommandList>
            <CommandEmpty>No card found.</CommandEmpty>
            <CommandGroup className={`!w-[${containerWidth}px]`}>
              <FixedSizeList
                width={containerWidth - 10}
                height={150}
                itemSize={32}
                itemCount={currentValues.length}
              >
                {({ index, style }) => {
                  const card = currentValues[index];

                  const element = (
                    <CommandItem
                      key={index}
                      value={card.value}
                      onSelect={() => {
                        onSelect?.(card.value);
                        setOpen(false);
                      }}
                      style={style}
                      className={"flex justify-between"}
                    >
                      {card.label}
                      <p className={"tabular-nums text-red-400"}>
                        {padToThreeDigits(searchValues.indexOf(card) + 1)}
                      </p>
                    </CommandItem>
                  );

                  if (clickType === "anchor") {
                    return (
                      <a
                        href={appendUrlPath(
                          `/cards/${encodeURIComponent(card.value)}`
                        )}
                      >
                        {element}
                      </a>
                    );
                  }

                  return element;
                }}
              </FixedSizeList>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
