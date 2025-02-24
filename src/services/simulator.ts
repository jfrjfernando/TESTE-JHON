import { CardBaseType, CardMonsterType, IdType } from "../models/card.model";
import { PoolType } from "../models/pool.model";
import { STORAGE_KEY } from "../models/storage.entity";
import { findCardById } from "./finder";
import { extractFromStorage, storageDispatch } from "./storage";

export function poolsToCards(
  pools: PoolType[]
): (CardBaseType | CardMonsterType)[] {
  return pools
    .reduce((acc, pool) => {
      acc.push(...pool.cards);

      return acc;
    }, [] as PoolType["cards"])
    .map((id) => findCardById(id as IdType))
    .filter((each) => each) as (CardBaseType | CardMonsterType)[];
}

export function selectPools(...pools: PoolType[]) {
  const value = extractFromStorage();

  value.simulator.pools = {
    ...value.simulator.pools,
    ...pools.filter((each) => !value.simulator.pools.includes(each)),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  storageDispatch();
}

export function unselectPools(...pools: PoolType[]) {
  const value = extractFromStorage();

  value.simulator.pools = value.simulator.pools.filter(
    (each) => !pools.includes(each)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  storageDispatch();
}
