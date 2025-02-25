import { GroupType } from "../models/group.model";
import { STORAGE_KEY } from "../models/storage.entity";
import { generateRandomID } from "../utils/uid";
import { storageDispatch, extractFromStorage } from "./storage";

export function createEmptyPool(): GroupType {
  const storage = extractFromStorage();

  const value: GroupType = {
    id: generateRandomID(),
    name: "Untitled",
    cards: [],
  };

  storage.groups.push(value);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();

  return value;
}

export function deletePool(id: GroupType["id"]): void {
  const storage = extractFromStorage();

  const index = storage.groups.findIndex((p) => p.id === id);

  if (index === -1) {
    console.error(`Internal Error: Pool '${id}' was not found!`);

    return;
  }

  storage.groups.splice(index, 1);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}

export function updatePool(pool: GroupType): void {
  const storage = extractFromStorage();

  const index = storage.groups.findIndex((p) => p.id === pool.id);

  if (index === -1) {
    console.error(`Internal Error: Pool '${pool.id}' was not found!`);

    return;
  }

  storage.groups[index] = pool;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}
