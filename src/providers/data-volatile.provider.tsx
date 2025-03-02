import { DataVolatileContext } from "@/contexts/data-volatile.context";
import { CardBaseType } from "@/models/card.model";
import { GroupType } from "@/models/group.model";
import { loadAllCards, loadAllGroups } from "@/services/data";
import { PropsWithChildren } from "preact/compat";
import { useCallback, useEffect, useState } from "preact/hooks";

export function DataVolatileProvider({ children }: PropsWithChildren) {
  const [cards, setCards] = useState<CardBaseType[]>();
  const [groups, setGroups] = useState<GroupType[]>();

  const loadCards = useCallback(async () => {
    setCards(await loadAllCards());
  }, []);

  const loadGroups = useCallback(async () => {
    setGroups(await loadAllGroups());
  }, []);

  useEffect(() => {
    loadCards();
    loadGroups();
  }, []);

  return (
    <DataVolatileContext.Provider
      value={{
        cards,
        groups,
      }}
    >
      {children}
    </DataVolatileContext.Provider>
  );
}
