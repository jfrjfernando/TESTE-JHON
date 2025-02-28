import { PropsWithChildren, useEffect, useMemo, useState } from "preact/compat";
import { HandType, SimulatorContext } from "../contexts/simulator.context";
import { CardBaseType } from "../models/card.model";
import { useStorage } from "../hooks/storage.hook";
import { groupsToCards } from "../services/simulator";
import { generateHand, shuffleCards } from "../services/randomize";
import { DEFAULT_GROUPS } from "@/models/data/groups";

export function SimulatorProvider({ children }: PropsWithChildren) {
  const [speed, setSpeed] = useState<1 | 2 | 3 | 4 | 5>(1);
  const { groups, simulator } = useStorage();

  const allGroups = useMemo(
    () => [...groups, ...DEFAULT_GROUPS],
    [groups, DEFAULT_GROUPS]
  );

  const [cards, setCards] = useState<CardBaseType[]>(
    shuffleCards(
      groupsToCards(
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
        hand,
        setHand,
        cards,
        setCards,
        speed,
        setSpeed,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
}
