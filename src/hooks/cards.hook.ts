import { useCallback } from "preact/hooks";
import { useData } from "./data.hook";
import { CardBaseType, IdType } from "@/models/card.model";

export function useCards() {
  const { cards } = useData();

  const findCardById = useCallback(
    (id: IdType) => cards.find((each) => each.id === id),
    [cards]
  );

  const findCardsByIds = useCallback(
    (...ids: IdType[]) => cards.filter((each) => ids.includes(each.id)),
    [cards]
  );

  const findCardByName = useCallback(
    (name: CardBaseType["name"]) => cards.find((each) => each.name === name),
    [cards]
  );

  return {
    findCardById,
    findCardsByIds,
    findCardByName,
  };
}
