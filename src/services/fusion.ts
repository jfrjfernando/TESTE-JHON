import { useCards } from "@/hooks/cards.hook";
import {
  CardBaseType,
  CardEquipType,
  CardMonsterType,
  CardType,
} from "../models/card.model";

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

export type PredictedFusionLine = {
  /**
   * Array of hand index (priority line)
   */
  line: number[];

  /**
   * All fusions in the line
   */
  resultsId: CardBaseType[];
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

    if (!fusionResult) {
      if (
        result.cardType !== CardType.MONSTER &&
        target.cardType === CardType.MONSTER
      ) {
        // Example: Equip + Monster = Monster
        result = target;
      } else if (
        result.cardType === CardType.MONSTER &&
        target.cardType !== CardType.MONSTER
      ) {
        // Example: Monster + Equip = Monster
        // result = result;
      } else {
        // Example: Monster A + Monster B = Monster B
        result = target;
      }
    } else {
      result = fusionResult;
    }

    responses.push({
      success: !!fusionResult,
      result,
    });
  }

  return responses;
}

/**
 * Get possible fusions from cards
 */
export function predictFusions(
  hand: CardBaseType[],
  findCardById: ReturnType<typeof useCards>["findCardById"]
): PredictedFusionLine[] {
  const predicted: PredictedFusionLine[] = [];

  const monstersFirst: {
    card: CardBaseType;
    index: number;
  }[] = hand
    .map((card, index) => ({
      card,
      index,
    }))
    .sort((a, b) =>
      a.card.cardType === CardType.MONSTER &&
      b.card.cardType !== CardType.MONSTER
        ? -1
        : a.card.cardType !== CardType.MONSTER &&
          b.card.cardType === CardType.MONSTER
        ? 1
        : 0
    );

  for (let i = 0; i < monstersFirst.length; i++) {
    const line = [monstersFirst[i].index];
    const results = [];

    // Base card
    let lastCard: CardBaseType = monstersFirst[i].card;

    compare: for (let j = 0; j < monstersFirst.length; j++) {
      if (line.includes(monstersFirst[j].index)) {
        // The card is in the line already
        continue;
      }

      const compareCard: CardBaseType = monstersFirst[j].card;

      for (const [target, result] of lastCard.fusions ?? []) {
        if (target === compareCard.id) {
          const findCard = findCardById(result);

          if (!findCard) {
            console.error("Internal error: card was not found!", target);
            continue;
          }

          // Add to the current line
          line.push(monstersFirst[j].index);

          // Set last card as result
          lastCard = findCard;

          results.push(findCard);

          continue compare;
        }
      }

      for (const equip of (lastCard as CardMonsterType).equips ?? []) {
        if (equip === compareCard.id) {
          const findCard = findCardById(equip);

          if (!findCard) {
            console.error("Internal error: card was not found!", equip);
            continue;
          }

          let addition = (findCard as CardEquipType).modificationValue ?? 0;

          if (
            results.length > 0 &&
            (results[results.length - 1] as any).addition
          ) {
            addition += (results[results.length - 1] as any).addition;
          }

          const rawAttack = (lastCard as CardMonsterType)?.attack;
          const rawDefense = (lastCard as CardMonsterType)?.attack;

          const attack = rawAttack ? rawAttack + addition : undefined;
          const defense = rawDefense ? rawDefense + addition : undefined;

          // Add to the current line
          line.push(monstersFirst[j].index);

          results.push({
            ...lastCard,
            attack,
            defense,
            addition,
          });

          continue compare;
        }
      }
    }

    if (line.length <= 1) {
      // Fusions need two cards at least

      continue;
    }

    predicted.push({
      line,
      resultsId: results,
    });
  }

  return predicted;
}
