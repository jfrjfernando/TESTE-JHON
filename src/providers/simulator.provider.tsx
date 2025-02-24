import { PropsWithChildren, useEffect, useState } from "preact/compat";
import { HandType, SimulatorContext } from "../contexts/simulator.context";
import { CardBaseType } from "../models/card.model";
import { useStorage } from "../hooks/storage.hook";
import { poolsToCards } from "../services/simulator";
import { shuffleCards } from "../services/randomize";

export function SimulatorProvider({ children }: PropsWithChildren) {
  const {
    simulator: { pools },
  } = useStorage();
  const [hand, setHand] = useState<HandType>([]);
  const [cards, setCards] = useState<CardBaseType[]>(
    shuffleCards(poolsToCards(pools))
  );

  useEffect(() => {
    // New pools detected
    setCards(shuffleCards(poolsToCards(pools)));
  }, [pools]);

  useEffect(() => {
    // TODO:
    console.log("CARDS NEW STATE", cards.length);
  }, [cards]);

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
