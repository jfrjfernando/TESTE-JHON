import { useCallback, useContext } from "preact/hooks";
import { PriorityType, SimulatorContext } from "../contexts/simulator.context";
import { generateHand } from "../services/randomize";
import { CardBaseType } from "../models/card.model";

export function useSimulator() {
  const { hand, setHand, cards, setCards } = useContext(SimulatorContext);

  const resetHand = useCallback(
    () => setHand(generateHand(cards)),
    [setCards, generateHand, cards]
  );

  const init = useCallback(() => {
    // Initialize the simulator

    // Set the hand
    resetHand();
  }, [resetHand]);

  const selectHandCard = useCallback(
    (select: CardBaseType) => {
      const index = hand.findIndex((card) => card.id === select.id);

      if (!index) {
        console.error("Internal error: Card not found in hand");
        return;
      }

      const handClone = [...hand];

      handClone[index] = {
        ...hand[index],
        priority: (hand.filter((each) => each.priority).length +
          1) as PriorityType,
      };

      setHand(handClone);
    },
    [hand, setHand]
  );

  return {
    hand,
    setCards,
    resetHand,
    selectHandCard,
    init,
  };
}
