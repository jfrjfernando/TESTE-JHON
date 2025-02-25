import { array, InferType, object } from "yup";
import { GroupModel } from "./group.model";

export type StorageEntityType = InferType<typeof StorageEntity>;

export const StorageEntity = object({
  // Created groups
  groups: array().of(GroupModel.required()).required(),
  simulator: object({
    // Selected groups
    groups: array().of(GroupModel.required()).required(),
  }).required(),
}).required();

export const STORAGE_KEY = "storage";
export const STORAGE_EVENT_KEY = "storage_event";
