import { createContext } from "preact";
import { CardBaseType } from "../models/card.model";

export type PriorityType = 1 | 2 | 3 | 4 | 5;

export type HandType = (CardBaseType & {
  /**
   * Selected card priority to fusion
   */
  priority?: PriorityType;

  /**
   * Player is focus this card
   */
  focus?: boolean;
})[];

export type SimulatorContextType = {
  /**
   * All cards from pool (already shuffled).
   */
  cards: CardBaseType[];

  /**
   * Current cards in the hand
   */
  hand: HandType;

  /**
   * Set new hand
   */
  setHand: (hand: HandType) => void;

  /**
   * Set new cards
   */
  setCards: (cards: CardBaseType[]) => void;
};

export const SimulatorContext = createContext<SimulatorContextType>({
  hand: [],
  setHand: () => {},
  cards: [],
  setCards: () => {},
});
