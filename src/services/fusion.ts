import { CardBaseType } from "../models/card.model";
import { findCardById } from "./finder";

type FusionResponse = {
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

export function queueFusion(queue: CardBaseType[]): FusionResponse[] {
  if (queue.length < 2) {
    console.error("Can't fusion only one card!");

    return [];
  }

  const responses: FusionResponse[] = [];

  let result: CardBaseType = queue[0];

  for (let i = 1; i < queue.length; i++) {
    const target = queue[i];

    // Result will be the fusion or in fail case it will be target card
    const fusionResult = resolveFusion(result, target);

    result = fusionResult ?? target;

    responses.push({
      success: !!fusionResult,
      result,
    });
  }

  return responses;
}
