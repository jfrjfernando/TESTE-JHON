import { useFusion } from "@/hooks/fusion.hook";
import { HandTable } from "../organisms/HandTable";
import { useEffect } from "preact/hooks";
import { useSimulator } from "@/hooks/simulator.hook";
import { useSimulatorInput } from "@/hooks/simulator-input.hook";

export function Simulator() {
  const { setFusing } = useFusion();
  const { resetHand } = useSimulator();
  useSimulatorInput();

  useEffect(() => {
    // Start simulator
    resetHand();

    return () => {
      // Unload simulator
      setFusing(false);
    };
  }, []);

  return (
    <section className={"max-w-[850px] m-auto h-[100vh]"}>
      <HandTable />
    </section>
  );
}
