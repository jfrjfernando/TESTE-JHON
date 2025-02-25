import { CardBaseType, CardMonsterType, IdType } from "../models/card.model";
import { GroupType } from "../models/group.model";
import { STORAGE_KEY } from "../models/storage.entity";
import { findCardById } from "./finder";
import { extractFromStorage, storageDispatch } from "./storage";

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

export function selectGroups(...groups: GroupType[]) {
  const value = extractFromStorage();

  value.simulator.groups = {
    ...value.simulator.groups,
    ...groups.filter((each) => !value.simulator.groups.includes(each)),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  storageDispatch();
}

export function unselectGroups(...groups: GroupType[]) {
  const value = extractFromStorage();

  value.simulator.groups = value.simulator.groups.filter(
    (each) => !groups.includes(each)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  storageDispatch();
}
