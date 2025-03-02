import { useCards } from "@/hooks/cards.hook";
import { CardBaseType, CardMonsterType, CardType } from "../models/card.model";

export type FusionResponse = {
  /**
   * The fusion was success
   */
  success: boolean;

  /**
   * The fusion card result or the second card (target)
   */
  result: CardBaseType;
};

export function resolveFusion(
  findCardById: ReturnType<typeof useCards>["findCardById"],
  source: CardBaseType,
  target: CardBaseType
): CardBaseType | null {
  if (
    !(source.fusions?.length || (source as CardMonsterType)?.equips?.length)
  ) {
    return null;
  }
  const fusion = source.fusions?.find((fusion) => fusion[0] === target.id);

  if (!fusion) {
    // Fusion not exists.

    // Try with equips
    if (
      source.cardType === CardType.MONSTER &&
      target.cardType !== CardType.MONSTER
    ) {
      if (
        (source as CardMonsterType).equips?.find((each) => each === target.id)
      ) {
        // It's an equip "fusion"

        return source;
      }
    }

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

export function generateQueueFusions(
  findCardById: ReturnType<typeof useCards>["findCardById"],
  queue: CardBaseType[]
): FusionResponse[] {
  if (queue.length < 2) {
    console.error("Can't fusion only one card!");

    return [];
  }

  const responses: FusionResponse[] = [];

  let result: CardBaseType = queue[0];

  for (let i = 1; i < queue.length; i++) {
    const target = queue[i];

    // Result will be the fusion or in fail case it will be target card
    const fusionResult = resolveFusion(findCardById, result, target);

    if (
      result.cardType !== CardType.MONSTER &&
      target.cardType === CardType.MONSTER
    ) {
      result = target;
    } else if (
      target.cardType !== CardType.MONSTER &&
      result.cardType === CardType.MONSTER
    ) {
      // result = result;
    } else {
      result = fusionResult ?? target;
    }

    responses.push({
      success: !!fusionResult,
      result,
    });
  }

  return responses;
}
