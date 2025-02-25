import { PropsWithChildren, useCallback, useState } from "preact/compat";
import { FusionContext } from "@/contexts/fusion.context";
import { FusionResponse } from "@/services/fusion";

export function FusionProvider({ children }: PropsWithChildren) {
  const [fusing, setFusing] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [queue, setQueue] = useState<FusionResponse[]>([]);

  const reset = useCallback(() => {
    setFusing(false);
    setIndex(-1);
    setQueue([]);
  }, [setFusing, setIndex, setQueue]);

  return (
    <FusionContext.Provider
      value={{
        fusing,
        setFusing,
        index,
        setIndex,
        queueFusions: queue,
        setQueueFusions: setQueue,
        reset,
      }}
    >
      {children}
    </FusionContext.Provider>
  );
}
