import { ComponentProps } from "preact";
import { FusionsGrid } from "./FusionsGrid";
import { useCards } from "@/hooks/cards.hook";
import { useMemo } from "preact/hooks";
import { CardBaseType, IdType } from "@/models/card.model";

export function RecipeFusionsGrid(
  props: Pick<
    ComponentProps<typeof FusionsGrid>,
    "card" | "equips" | "fusionsContainerProps" | "maxHeight"
  >
) {
  const { card } = props;
  const { cards } = useCards();

  const recipeFusions = useMemo((): [
    CardBaseType["id"],
    CardBaseType["id"]
  ][] => {
    const id = card.id;

    return cards.reduce((result, eachCard) => {
      for (const [source, target] of eachCard.fusions ?? []) {
        if (target === id) {
          // The result is the context card
          const newTarget = source;

          result.push([eachCard.id, newTarget as IdType]);
        }
      }

      return result;
    }, [] as [CardBaseType["id"], CardBaseType["id"]][]);
  }, [cards, card]);

  return recipeFusions.length ? (
    <FusionsGrid
      title={() => (
        <p className={"text-center text-3xl text-white"}>
          RECIPE ({recipeFusions.length})
        </p>
      )}
      reverse
      fusions={recipeFusions}
      {...props}
    />
  ) : (
    <></>
  );
}
