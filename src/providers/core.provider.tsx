import { PropsWithChildren } from "preact/compat";
import { StorageProvider } from "./storage.provider";
import { SimulatorProvider } from "./simulator.provider";
import { FusionProvider } from "./fusions.provider";
import { DataProvider } from "./data.provider";
import { DataVolatileProvider } from "./data-volatile.provider";

export function CoreProvider({
  children,
  dataLessComponents,
}: PropsWithChildren<{
  dataLessComponents: React.ComponentProps<
    typeof DataProvider
  >["dataLessComponents"];
}>) {
  return (
    <DataVolatileProvider>
      <DataProvider dataLessComponents={dataLessComponents}>
        <StorageProvider>
          <SimulatorProvider>
            <FusionProvider>{children}</FusionProvider>
          </SimulatorProvider>
        </StorageProvider>
      </DataProvider>
    </DataVolatileProvider>
  );
}
