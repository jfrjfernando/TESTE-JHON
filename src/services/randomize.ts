import { CardBaseType, MAX_HAND_CARDS } from "../models/card.model";
import { shuffleDeck } from "../utils/algorithms";

export function shuffleCards(cards: CardBaseType[]): CardBaseType[] {
  return shuffleDeck(cards);
}

export function generateHand(cards: CardBaseType[]): CardBaseType[] {
  return shuffleCards(cards).slice(0, MAX_HAND_CARDS);
}
