import { PropsWithChildren, useEffect, useState } from "preact/compat";
import { HandType, SimulatorContext } from "../contexts/simulator.context";
import { CardBaseType } from "../models/card.model";
import { useStorage } from "../hooks/storage.hook";
import { groupsToCards } from "../services/simulator";
import { generateHand, shuffleCards } from "../services/randomize";

export function SimulatorProvider({ children }: PropsWithChildren) {
  const {
    simulator: { groups },
  } = useStorage();
  const [cards, setCards] = useState<CardBaseType[]>(
    shuffleCards(groupsToCards(groups))
  );
  const [hand, setHand] = useState<HandType>(generateHand(cards));

  useEffect(() => {
    // New groups detected
    setCards(shuffleCards(groupsToCards(groups)));
  }, [groups]);

  return (
    <SimulatorContext.Provider
      value={{
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
