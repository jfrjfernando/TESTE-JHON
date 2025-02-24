import { array, InferType, object } from "yup";
import { PoolModel } from "./pool.model";

export type StorageEntityType = InferType<typeof StorageEntity>;

export const StorageEntity = object({
  // Created pools
  pools: array().of(PoolModel.required()).required(),
  simulator: object({
    // Selected pools
    pools: array().of(PoolModel.required()).required(),
  }).required(),
}).required();

export const STORAGE_KEY = "storage";
export const STORAGE_EVENT_KEY = "storage_event";
