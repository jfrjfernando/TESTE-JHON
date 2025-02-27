import { CardBaseType, IdType } from "../models/card.model";
import ALL_CARDS from "../models/data/cards";

export function findCardById(id: IdType) {
  return ALL_CARDS.find((each) => each.id === id);
}

export function findCardsByIds(...ids: IdType[]) {
  return ALL_CARDS.filter((each) => ids.includes(each.id));
}

export function findCardByName(name: CardBaseType["name"]) {
  return ALL_CARDS.find((each) => each.name === name);
}
