import { useFusion } from "@/hooks/fusion.hook";
import { useSimulator } from "@/hooks/simulator.hook";
import { cn } from "@/lib/utils";
import { MAX_HAND_CARDS } from "@/models/card.model";
import { useMemo } from "preact/hooks";

export function FusionResults() {
  const { hand } = useSimulator();
  const { queueFusions, index: fusionIndex, fusing } = useFusion();
  const fusions = useMemo(
    () => hand.filter((each) => !!each.priority).length - 1,
    [hand]
  );

  return (
    <div class={"flex gap-4 justify-center mb-2"}>
      {Array.from({ length: MAX_HAND_CARDS - 1 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-6 h-6 rounded-sm bg-gradient-to-bl from-gray-600 to-slate-800 0 shadow-black shadow-sm border-slate-500 opacity-60",
            fusions > index && "from-gray-800 to-slate-900 opacity-55",
            fusing && fusionIndex >= index
              ? queueFusions[index].success
                ? "from-green-600 to-green-800 border-green-500 opacity-45"
                : "from-rose-950 to-red-800 border-red-500 opacity-45"
              : ""
          )}
        />
      ))}
    </div>
  );
}
