import { PropsWithChildren } from "preact/compat";
import { StorageProvider } from "./storage.provider";
import { SimulatorProvider } from "./simulator.provider";

export function CoreProvider({ children }: PropsWithChildren) {
  return (
    <StorageProvider>
      <SimulatorProvider>{children}</SimulatorProvider>
    </StorageProvider>
  );
}
