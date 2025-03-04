import {
  CURRENT_VERSION,
  STORAGE_EVENT_KEY,
  STORAGE_KEY,
  StorageEntity,
  StorageEntityType,
} from "../models/storage.entity";
import { DEFAULT_SELECTED_GROUPS } from "./group";
import { _MIGRATION_storageTo0_0_1 } from "./migrations/to-0.0.1";

export function extractFromStorage(): StorageEntityType {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (!storage) {
    // Tasks not exists yet

    return initStorage();
  }

  try {
    const rawStorageAsArray: object = JSON.parse(storage);

    // Migration check (from unknown to 0.0.1):
    if (!(rawStorageAsArray as any).version) {
      return _MIGRATION_storageTo0_0_1(
        rawStorageAsArray,
        DEFAULT_SELECTED_GROUPS,
        () => backupIt(String(storage))
      );
    }

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
  const value: StorageEntityType = {
    groups: [],
    simulator: {
      groups: DEFAULT_SELECTED_GROUPS.map((id) => ({
        id,
        timestamp: Date.now(),
      })),
      settings: {
        showFusions: true,
        speed: 1,
      },
    },
    version: CURRENT_VERSION,
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
