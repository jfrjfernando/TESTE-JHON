import { useFusion } from "@/hooks/fusion.hook";
import { HandTable } from "../organisms/HandTable";
import { useEffect } from "preact/hooks";

export function Simulator() {
  const { setFusing } = useFusion();

  useEffect(() => {
    // About fusing when exit from simulator
    return () => setFusing(false);
  }, []);

  return (
    <section className={"max-w-[850px] m-auto h-[100vh]"}>
      <HandTable />
    </section>
  );
}
