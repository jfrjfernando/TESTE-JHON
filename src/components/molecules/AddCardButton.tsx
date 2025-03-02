import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar";

export function AddCardButton({
  onAdd,
}: {
  onAdd: (cardName: string) => void;
}) {
  return (
    <SearchBar clickType="custom" onSelect={onAdd}>
      <Button
        className={
          "flex bg-accent-foreground h-[90px] w-[72px] text-border text-3xl border rounded-sm hover:text-gradient-one hover:opacity-90 hover:bg-background hover:scale-[1.05] transition-all cursor-pointer focus:border-active"
        }
        aria-label={"Add card to group button"}
      >
        <p className={"m-auto"}>+</p>
      </Button>
    </SearchBar>
  );
}
