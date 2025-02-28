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
          "flex bg-slate-600 h-[90px] w-[72px] text-3xl border rounded-sm hover:text-yellow-600 hover:bg-slate-700 hover:scale-[1.05] transition-all cursor-pointer"
        }
      >
        <p className={"m-auto"}>+</p>
      </Button>
    </SearchBar>
  );
}
