import { GroupModel, GroupSelectedModel } from "@/models/group.model";
import { STORAGE_KEY, StorageEntityType } from "@/models/storage.entity";
import { storageDispatch } from "../storage";

export function _MIGRATION_storageTo0_0_1(
  object: any,
  groupsIds: string[],
  runBackup: () => void
): StorageEntityType {
  const newStorage = {
    groups: [],
    simulator: {
      groups: groupsIds.map((id) => ({
        id,
        timestamp: Date.now(),
      })),
      settings: {
        showFusions: true,
        speed: 2,
      },
    },
    version: "0.0.1",
  } as StorageEntityType;

  let createdGroups = object?.["groups"];

  try {
    createdGroups = createdGroups.map((each: any) =>
      GroupModel.validateSync(each)
    );
  } catch (e) {
    createdGroups = null;
    console.error(
      "Error trying to migrate to new storage version",
      e,
      createdGroups
    );
  }

  let simulatorGroups = object?.["simulator"]?.["groups"];

  try {
    simulatorGroups = simulatorGroups.map((each: any) =>
      GroupSelectedModel.validateSync(each)
    );
  } catch (e) {
    simulatorGroups = null;
    console.error(
      "Error trying to migrate to new storage version",
      e,
      simulatorGroups
    );
  }

  createdGroups && (newStorage.groups = createdGroups);
  simulatorGroups && (newStorage.simulator.groups = simulatorGroups);

  if (!createdGroups || !simulatorGroups) {
    runBackup();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));

  storageDispatch();

  return newStorage;
}
