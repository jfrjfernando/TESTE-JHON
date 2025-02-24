import { PropsWithChildren, useEffect, useState } from "preact/compat";
import { STORAGE_EVENT_KEY, StorageEntityType } from "../models/storage.entity";
import { extractFromStorage } from "../services/storage";
import { StorageContext } from "../contexts/storage.context";

export function StorageProvider({ children }: PropsWithChildren) {
  const [storage, setStorage] = useState<StorageEntityType>(
    extractFromStorage()
  );

  useEffect(() => {
    // Load tasks first time and when it changes!

    const listener = () => {
      setStorage(extractFromStorage());
    };

    // Load it
    document.addEventListener(STORAGE_EVENT_KEY, listener);

    // Unload it
    return () => document.removeEventListener(STORAGE_EVENT_KEY, listener);
  }, []);

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
}
