import { CardBaseType } from "@/models/card.model";
import { MiniCard } from "../molecules/MiniCard";
import { cn } from "@/lib/utils";

export function DrawFusion({
  source,
  target,
  result,
  columnMode,
}: {
  source: CardBaseType;
  target: CardBaseType;
  result: CardBaseType;
  columnMode?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex text-white items-center text-6xl gap-1",
        columnMode && "flex-col text-xl"
      )}
    >
      <MiniCard {...source} />
      <p>+</p>
      <MiniCard {...target} />
      <p>=</p>
      <MiniCard {...result} />
    </div>
  );
}
