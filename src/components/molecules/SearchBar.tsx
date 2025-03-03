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
import { appendUrlPath } from "@/utils/path";
import { FixedSizeList } from "react-window";
import { cn } from "@/lib/utils";
import { padToThreeDigits } from "@/utils/strings";
import { useData } from "@/hooks/data.hook";

export function SearchBar({
  children,
  clickType = "anchor",
  onSelect,
  cards,
}: React.PropsWithChildren<{
  clickType?: "anchor" | "custom";
  onSelect?: (cardName: string) => void;
  cards?: ReturnType<typeof useData>["cards"];
}>) {
  const [open, setRawOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { cards: allCards } = cards ? { cards } : useData();
  const searchValues = useMemo(() => {
    return allCards.map((card) => ({
      value: card.name,
      label: card.name,
    }));
  }, [cards]);

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
    () =>
      searchValues
        .filter((each) =>
          each.value.toLowerCase().includes(search.toLowerCase())
        )
        .splice(0, 30),
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
            className={`text-white group w-[374px] max-[731px]:w-[250px] max-[600px]:w-[150px] max-[500px]:w-[125px] max-[295px]:w-[75px] max-[205px]:w-[55px] max-[200px]:w-[100%] justify-between`}
            aria-label={"Search cards"}
            ref={ref}
          >
            <p className={"w-inherit overflow-hidden"}>Search card...</p>
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
            <CommandEmpty
              style={{
                width: containerWidth,
              }}
            >
              No card found.
            </CommandEmpty>
            <CommandGroup className={`!w-[${containerWidth}px]`}>
              {search ? (
                currentValues.map((each, index) => {
                  const element = (
                    <CommandItem
                      id={`command-item-${index}`}
                      key={index}
                      value={each.value}
                      onSelect={() => {
                        setOpen(false);
                        onSelect?.(each.value);
                      }}
                      className={
                        "flex justify-between group text-lg text-nowrap overflow-hidden"
                      }
                    >
                      <p class={"w-full overflow-hidden"}>{each.label}</p>
                      <p
                        className={
                          "tabular-nums text-xl text-white group-data-[selected=true]:text-black"
                        }
                      >
                        {padToThreeDigits(searchValues.indexOf(each) + 1)}
                      </p>
                    </CommandItem>
                  );

                  if (clickType === "anchor") {
                    return (
                      <a
                        href={appendUrlPath(
                          `/cards/${encodeURIComponent(each.value)}`
                        )}
                      >
                        {element}
                      </a>
                    );
                  }

                  return element;
                })
              ) : (
                <FixedSizeList
                  width={containerWidth - 6}
                  height={240}
                  itemSize={40}
                  itemCount={currentValues.length}
                >
                  {({ index, style }) => {
                    const card = currentValues[index];

                    const element = (
                      <CommandItem
                        id={`command-item-${index}`}
                        key={index}
                        value={card.value}
                        onSelect={() => {
                          setOpen(false);
                          onSelect?.(card.value);
                        }}
                        style={style}
                        className={
                          "flex justify-between group text-lg text-nowrap overflow-hidden"
                        }
                      >
                        <p class={"w-full overflow-hidden"}>{card.label}</p>
                        <p
                          className={
                            "tabular-nums text-xl text-white group-data-[selected=true]:text-black"
                          }
                        >
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
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
