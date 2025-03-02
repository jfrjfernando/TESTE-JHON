import { DataVolatileContext } from "@/contexts/data-volatile.context";
import { DataContext } from "@/contexts/data.context";
import { useContext } from "preact/hooks";

export function useData() {
  const { cards, groups } = useContext(DataContext);

  return { cards, groups };
}

export function useDataVolatile() {
  const { cards, groups } = useContext(DataVolatileContext);

  return { cards, groups };
}
