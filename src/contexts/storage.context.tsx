import React from "preact/compat";
import { StorageEntityType } from "../models/storage.entity";

export const StorageContext = React.createContext<StorageEntityType>({
  pools: [],
  simulator: {
    pools: [],
  },
});
