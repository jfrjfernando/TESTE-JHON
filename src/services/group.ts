import { CardBaseType } from "@/models/card.model";
import { GroupType } from "../models/group.model";
import { STORAGE_KEY } from "../models/storage.entity";
import { generateRandomID } from "../utils/uid";
import { storageDispatch, extractFromStorage } from "./storage";

export function createEmptyGroup(): GroupType {
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

export function deleteGroup(id: GroupType["id"]): void {
  const storage = extractFromStorage();

  const index = storage.groups.findIndex((p) => p.id === id);

  if (index === -1) {
    console.error(`Internal Error: Group '${id}' was not found!`);

    return;
  }

  storage.groups.splice(index, 1);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}

export function updateGroup({
  ...props
}: Partial<GroupType> & Pick<GroupType, "id">): void {
  const storage = extractFromStorage();

  const index = storage.groups.findIndex((p) => p.id === props.id);

  if (index === -1) {
    console.error(`Internal Error: Group '${props.id}' was not found!`);

    return;
  }

  storage.groups[index] = {
    ...storage.groups[index],
    ...props,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}

export function addGroupCards(
  groupId: GroupType["id"],
  ...cards: CardBaseType[]
) {
  const storage = extractFromStorage();

  const index = storage.groups.findIndex((p) => p.id === groupId);

  if (index === -1) {
    console.error(`Internal Error: Group '${groupId}' was not found!`);

    return;
  }

  storage.groups[index] = {
    ...storage.groups[index],
    cards: [...storage.groups[index].cards, ...cards.map((each) => each.id)],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}

export function removeGroupCards(
  groupId: GroupType["id"],
  ...cards: CardBaseType[]
) {
  const storage = extractFromStorage();

  const index = storage.groups.findIndex((p) => p.id === groupId);

  if (index === -1) {
    console.error(`Internal Error: Group '${groupId}' was not found!`);

    return;
  }

  storage.groups[index] = {
    ...storage.groups[index],
    cards: storage.groups[index].cards.filter(
      (each) => !cards.some((card) => card.id === each)
    ),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  storageDispatch();
}
