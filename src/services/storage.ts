import { useData } from "@/hooks/data.hook";
import {
  STORAGE_EVENT_KEY,
  STORAGE_KEY,
  StorageEntity,
  StorageEntityType,
} from "../models/storage.entity";

export function extractFromStorage(): StorageEntityType {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (!storage) {
    // Tasks not exists yet

    return initStorage();
  }

  try {
    const rawStorageAsArray: object = JSON.parse(storage);

    const storageObject: StorageEntityType =
      StorageEntity.validateSync(rawStorageAsArray);

    return storageObject;
  } catch {
    // Backup after reset it
    backupIt(String(storage));

    // Reset
    return initStorage();
  }
}

function initStorage(): StorageEntityType {
  const { groups } = useData();

  const value: StorageEntityType = {
    groups: [],
    simulator: {
      groups: [groups[0], groups[1]],
    },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  storageDispatch();

  return value;
}

export function storageDispatch() {
  // Fire event for listeners, to re-hydrate components
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));
}

function backupIt(value: string) {
  localStorage.setItem(`${STORAGE_KEY}_${Date.now()}`, value);
}
