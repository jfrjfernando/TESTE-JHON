import { ButtonHTMLAttributes } from "preact/compat";
import { useSimulator } from "@/hooks/simulator.hook";
import { Button } from "./Button";
import { useFusion } from "@/hooks/fusion.hook";

export function ResetButton(props: ButtonHTMLAttributes) {
  const { resetHand } = useSimulator();
  const { fusing } = useFusion();
  return (
    <Button
      class={"w-min py-0 pt-1 pb-1 pr-4 pl-4 text-[30px]"}
      {...props}
      onClick={() => resetHand()}
      disabled={fusing}
    >
      RESET
    </Button>
  );
}
