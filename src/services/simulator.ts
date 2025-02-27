import { CardBaseType, CardMonsterType, IdType } from "../models/card.model";
import { GroupType } from "../models/group.model";
import { findCardById } from "./finder";

export function groupsToCards(
  groups: GroupType[]
): (CardBaseType | CardMonsterType)[] {
  return groups
    .reduce((acc, pool) => {
      acc.push(...pool.cards);

      return acc;
    }, [] as GroupType["cards"])
    .map((id) => findCardById(id as IdType))
    .filter((each) => each) as (CardBaseType | CardMonsterType)[];
}
