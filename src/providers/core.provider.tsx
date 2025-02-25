import { PropsWithChildren } from "preact/compat";
import { StorageProvider } from "./storage.provider";
import { SimulatorProvider } from "./simulator.provider";
import { FusionProvider } from "./fusions.provider";

export function CoreProvider({ children }: PropsWithChildren) {
  return (
    <StorageProvider>
      <SimulatorProvider>
        <FusionProvider>{children}</FusionProvider>
      </SimulatorProvider>
    </StorageProvider>
  );
}
