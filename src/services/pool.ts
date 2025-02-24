import { PoolType } from "../models/pool.model";
import { STORAGE_KEY } from "../models/storage.entity";
import { generateRandomID } from "../utils/uid";
import { storageDispatch, extractFromStorage } from "./storage";

export function createEmptyPool(): PoolType {
  const storage = extractFromStorage();

  const value: PoolType = {
    id: generateRandomID(),
    name: "Untitled",
    cards: [],
  };

  storage.pools.push(value);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();

  return value;
}

export function deletePool(id: PoolType["id"]): void {
  const storage = extractFromStorage();

  const index = storage.pools.findIndex((p) => p.id === id);

  if (index === -1) {
    console.error(`Internal Error: Pool '${id}' was not found!`);

    return;
  }

  storage.pools.splice(index, 1);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}

export function updatePool(pool: PoolType): void {
  const storage = extractFromStorage();

  const index = storage.pools.findIndex((p) => p.id === pool.id);

  if (index === -1) {
    console.error(`Internal Error: Pool '${pool.id}' was not found!`);

    return;
  }

  storage.pools[index] = pool;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}
