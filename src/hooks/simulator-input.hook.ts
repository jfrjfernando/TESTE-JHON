import { MAX_HAND_CARDS } from "@/models/card.model";
import { useFusion } from "./fusion.hook";
import { useInput } from "./input.hook";
import { useSimulator } from "./simulator.hook";

export function useSimulatorInput() {
  const { setFocusCard, focusCardIndex, selectHandCard } = useSimulator();
  const { startFusion } = useFusion();

  useInput([
    {
      keys: ["ArrowLeft"],
      action: () => setFocusCard(Math.max(0, (focusCardIndex ?? 0) - 1)),
    },
    {
      keys: ["ArrowRight"],
      action: () =>
        setFocusCard(Math.min(MAX_HAND_CARDS - 1, (focusCardIndex ?? 0) + 1)),
    },
    {
      keys: ["ArrowUp", "ArrowDown"],
      action: selectHandCard,
    },

    {
      keys: ["Space", "Enter"],
      action: startFusion,
    },
  ]);
}
