import { useSimulator } from "@/hooks/simulator.hook";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

export function PredictionToggleButton() {
  const { togglePrediction, isPredictionEnabled } = useSimulator();

  return (
    <Button
      className={cn(
        "m-0 p-2 px-4",
        isPredictionEnabled &&
          "border-2 border-yellow-400 text-yellow-400 shadow-2xl max-[527px]:w-[79.56px]"
      )}
      onClick={() => togglePrediction()}
      aria-label={"Speed up fusions animations button"}
    >
      {isPredictionEnabled ? (
        <Eye className={"m-auto"} />
      ) : (
        <EyeClosed className={"m-auto"} />
      )}
    </Button>
  );
}
