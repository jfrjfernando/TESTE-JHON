import React from "preact/compat";
import { CURRENT_VERSION, StorageEntityType } from "../models/storage.entity";

export const StorageContext = React.createContext<StorageEntityType>({
  groups: [],
  simulator: {
    groups: [],
    settings: {
      showFusions: true,
      speed: 1,
    },
  },
  version: CURRENT_VERSION,
});
