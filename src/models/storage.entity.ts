import { array, boolean, InferType, number, object, string } from "yup";
import { GroupModel, GroupSelectedModel } from "./group.model";

export const CURRENT_VERSION = "0.0.1";

export type StorageEntityType = InferType<typeof StorageEntity>;

export const StorageEntity = object({
  // Created groups
  groups: array().of(GroupModel.required()).required(),
  simulator: object({
    // Selected groups
    groups: array().of(GroupSelectedModel.required()).required(),
    // Settings
    settings: object({
      // Animation speed
      speed: number().min(1).max(5).default(1),

      // Show fusions
      showFusions: boolean().default(true),
    }).required(),
  }).required(),
  // Storage version
  version: string().default(CURRENT_VERSION).required(),
}).required();

export const STORAGE_KEY = "storage";
export const STORAGE_EVENT_KEY = "storage_event";
