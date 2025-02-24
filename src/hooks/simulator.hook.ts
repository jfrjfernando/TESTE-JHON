import { useCallback, useContext, useMemo } from "preact/hooks";
import { PriorityType, SimulatorContext } from "../contexts/simulator.context";
import { generateHand } from "../services/randomize";
import { PoolType } from "../models/pool.model";
import { selectPools, unselectPools } from "../services/simulator";
import { useStorage } from "./storage.hook";
import { queueFusion } from "../services/fusion";

export function useSimulator() {
  const { simulator } = useStorage();
  const { hand, setHand, cards, setCards } = useContext(SimulatorContext);
  const queueCards = useMemo(
    () =>
      [...hand]
        .filter((each) => each.priority)
        .sort((a, b) => a.priority! - b.priority!),
    [hand]
  );

  const resetHand = useCallback(
    () => setHand(generateHand(cards)),
    [setCards, generateHand, cards]
  );

  const init = useCallback(() => {
    // Initialize the simulator

    // Set the hand
    resetHand();
  }, [resetHand]);

  const selectHandCard = useCallback(() => {
    const cardIndex = hand.findIndex((each) => each.focus);
    const card = hand[cardIndex];

    if (!card) {
      // Not focus
      return;
    }

    const handClone = [...hand];

    if (card.priority) {
      handClone[cardIndex] = {
        ...hand[cardIndex],
        priority: undefined,
      };

      if (card.priority !== 1) {
        // It is not the first card in the queue

        for (let i = cardIndex + 1; i < hand.length; i++) {
          // Find higher cards for moving left
          const target = handClone[i];

          if (target.priority) {
            // Move left
            handClone[i] = {
              ...target,
              priority: (target.priority! - 1) as PriorityType,
            };
          }
        }
      }
    } else {
      handClone[cardIndex] = {
        ...hand[cardIndex],
        priority: (hand.filter((each) => each.priority).length +
          1) as PriorityType,
      };
    }

    setHand(handClone);
  }, [hand, setHand]);

  const selectPool = useCallback(
    (pool: PoolType) => selectPools(pool),
    [selectPools]
  );

  const unselectPool = useCallback(
    (pool: PoolType) => {
      if (simulator.pools.length <= 1) {
        // At least one is needed
        return;
      }

      unselectPools(pool);
    },
    [unselectPools, simulator]
  );

  const focusCard = useCallback(
    (handIndex: number) => {
      setHand(
        hand
          .map((each) => ({
            ...each,
            focus: false,
          }))
          .map((each, index) =>
            index === handIndex
              ? {
                  ...each,
                  focus: true,
                }
              : each
          )
      );
    },
    [setHand, hand]
  );

  const startFusion = useCallback(
    () => queueFusion(queueCards),
    [queueCards, queueFusion]
  );

  return {
    hand,
    setCards,
    resetHand,
    selectHandCard,
    init,
    selectPool,
    unselectPool,
    focusCard,
    startFusion,
  };
}
