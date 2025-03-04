import { useCallback, useContext, useMemo } from "preact/hooks";
import { StorageContext } from "../contexts/storage.context";
import { STORAGE_KEY } from "@/models/storage.entity";
import { storageDispatch } from "@/services/storage";

export function useStorage() {
  const value = useContext(StorageContext);

  const toggleSpeed = useCallback(() => {
    if (value.simulator.settings.speed < 2) {
      value.simulator.settings.speed = 3;
    } else {
      value.simulator.settings.speed = 1;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

    storageDispatch();
  }, [value]);

  const togglePrediction = useCallback(() => {
    value.simulator.settings.showFusions =
      !value.simulator.settings.showFusions;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

    storageDispatch();
  }, [value]);

  const isPredictionEnabled = useMemo(
    () => value.simulator.settings.showFusions,
    [value]
  );

  return {
    simulator: value.simulator,
    groups: value.groups,
    version: value.version,
    toggleSpeed,
    togglePrediction,
    isPredictionEnabled,
  };
}
