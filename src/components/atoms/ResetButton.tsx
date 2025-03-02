import { ButtonHTMLAttributes } from "preact/compat";
import { useSimulator } from "@/hooks/simulator.hook";
import { Button } from "./Button";
import { useFusion } from "@/hooks/fusion.hook";
import { cn } from "@/lib/utils";

export function ResetButton({ className, ...props }: ButtonHTMLAttributes) {
  const { resetHand } = useSimulator();
  const { fusing } = useFusion();
  return (
    <Button
      className={cn(
        "shadow-xl cursor-pointer group hover:shadow-md text-[30px] py-0",
        className
      )}
      aria-label={"Reset hand cards button"}
      {...props}
      onClick={() => resetHand()}
      disabled={fusing}
    >
      RESET
    </Button>
  );
}
