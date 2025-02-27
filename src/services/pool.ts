import { GroupType } from "@/models/group.model";
import { extractFromStorage, storageDispatch } from "./storage";
import { STORAGE_KEY } from "@/models/storage.entity";

export function selectGroups(...groups: GroupType[]) {
  const value = extractFromStorage();

  value.simulator.groups = [
    ...value.simulator.groups,
    ...groups.filter((each) => !value.simulator.groups.includes(each)),
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  storageDispatch();
}

export function unselectGroups(...groups: GroupType[]) {
  const value = extractFromStorage();

  value.simulator.groups = value.simulator.groups.filter(
    (each) => !groups.some((group) => group.id === each.id)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  storageDispatch();
}
