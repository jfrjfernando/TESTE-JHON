import { CardBaseType } from "../models/card.model";
import { findCardById } from "./finder";

export function resolveFusion(
  source: CardBaseType,
  target: CardBaseType
): CardBaseType | null {
  if (!source.fusions?.length) {
    return null;
  }

  const fusion = source.fusions.find((fusion) => fusion[0] === target.id);

  if (!fusion) {
    // Fusion not exists.
    return null;
  }

  // Get result card
  const card = findCardById(fusion[1]);

  if (!card) {
    console.error(`Internal Error: Card '${card}' was not found!`);

    return null;
  }

  return card;
}
