import { PropsWithChildren, useEffect, useMemo, useState } from "preact/compat";
import { HandType, SimulatorContext } from "../contexts/simulator.context";
import { CardBaseType } from "../models/card.model";
import { useStorage } from "../hooks/storage.hook";
import { groupsToCards } from "../services/simulator";
import { generateHand, shuffleCards } from "../services/randomize";
import { useData } from "@/hooks/data.hook";
import { useCards } from "@/hooks/cards.hook";

export function SimulatorProvider({ children }: PropsWithChildren) {
  const [resetTimes, setResetTimes] = useState<number>(0);
  const { groups, simulator } = useStorage();
  const { groups: defaultGroups } = useData();
  const { findCardById } = useCards();

  const allGroups = useMemo(
    () => [...groups, ...defaultGroups],
    [groups, defaultGroups]
  );

  const [cards, setCards] = useState<CardBaseType[]>(
    shuffleCards(
      groupsToCards(
        findCardById,
        simulator.groups
          .map((each) => allGroups.find((group) => group.id === each.id))
          .filter((each) => !!each)
      )
    )
  );
  const [hand, setHand] = useState<HandType>(generateHand(cards));

  useEffect(() => {
    // New groups detected
    setCards(
      shuffleCards(
        groupsToCards(
          findCardById,
          simulator.groups
            .map((each) => allGroups.find((group) => group.id === each.id))
            .filter((each) => !!each)
        )
      )
    );
  }, [groups]);

  return (
    <SimulatorContext.Provider
      value={{
        resets: resetTimes,
        setResets: setResetTimes,
        hand,
        setHand,
        cards,
        setCards,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
}
