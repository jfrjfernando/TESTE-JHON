import {
  CardBaseType,
  CardEquipType,
  CardMonsterType,
  CardType,
} from "@/models/card.model";
import { MiniCard } from "../molecules/MiniCard";
import { cn } from "@/lib/utils";
import { useMemo } from "preact/hooks";

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
  const modificationValue: number = useMemo(() => {
    if (target.cardType === CardType.EQUIP) {
      return (target as CardEquipType).modificationValue ?? 0;
    }

    return 0;
  }, [target]);

  const attack = useMemo(() => {
    if (result.cardType === CardType.MONSTER) {
      return (result as CardMonsterType).attack + modificationValue;
    }

    return undefined;
  }, [modificationValue, result]);

  const defense = useMemo(() => {
    if (result.cardType === CardType.MONSTER) {
      return (result as CardMonsterType).defense + modificationValue;
    }

    return undefined;
  }, [modificationValue, result]);

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
      <MiniCard {...result} attack={attack} defense={defense} />
    </div>
  );
}
