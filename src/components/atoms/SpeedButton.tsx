import { ChevronRight, ChevronsRight } from "lucide-react";
import { Button } from "./Button";
import { useMemo } from "preact/hooks";
import { cn } from "@/lib/utils";
import { useSimulator } from "@/hooks/simulator.hook";

export function SpeedButton({
  className,
  iconClassName,
}: {
  className: string;
  iconClassName: string;
}) {
  const { toggleSpeed, speed } = useSimulator();

  const activated = useMemo(() => speed !== 1, [speed]);

  return (
    <Button
      className={cn(
        "m-0 p-2 px-4",
        activated && "border-2 border-yellow-400 text-yellow-400 shadow-2xl",
        className
      )}
      onClick={() => toggleSpeed()}
      aria-label={"Speed up fusions animations button"}
    >
      {activated ? (
        <ChevronsRight className={iconClassName} />
      ) : (
        <ChevronRight className={iconClassName} />
      )}
    </Button>
  );
}
