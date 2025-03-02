import { MAX_HAND_CARDS } from "@/models/card.model";
import { useFusion } from "./fusion.hook";
import { useInput } from "./input.hook";
import { useSimulator } from "./simulator.hook";
// import { useControllerInput } from "./controller-input.hook";

// TODO: Add stick (using axes) support

export function useSimulatorInput() {
  const { setFocusCard, focusCardIndex, selectHandCard, resetHand } =
    useSimulator();
  const { startFusion, fusing } = useFusion();

  useInput([
    {
      keys: ["ArrowLeft"],
      action: () =>
        !fusing && setFocusCard(Math.max(0, (focusCardIndex ?? 0) - 1)),
    },
    {
      keys: ["ArrowRight"],
      action: () =>
        !fusing &&
        setFocusCard(Math.min(MAX_HAND_CARDS - 1, (focusCardIndex ?? 0) + 1)),
    },
    {
      keys: ["ArrowUp", "ArrowDown"],
      action: () => !fusing && selectHandCard(),
    },
    {
      keys: ["Space", "Enter"],
      action: () => !fusing && startFusion(),
    },
    {
      keys: ["KeyR"],
      action: resetHand,
    },
  ]);

  // TODO: I don't like this implementation of joystick
  // TODO: Find a better method, (freeze causes annoying)
  // const [freeze, setFreeze] = useState<Date>(new Date());

  // const {
  //   left,
  //   right,
  //   down,
  //   up,
  //   buttonA,
  //   buttonB,
  //   buttonX,
  //   buttonY,
  //   start,
  //   select,
  // } = useGamepadInput();

  // useEffect(() => {
  //   if (freeze.getTime() >= Date.now()) {
  //     console.log(freeze.getTime(), Date.now());
  //     console.error("FREEZE");
  //     return;
  //   }
  //   if (left) {
  //     setFocusCard(Math.max(0, (focusCardIndex ?? 0) - 1));
  //   } else if (right) {
  //     setFocusCard(Math.min(MAX_HAND_CARDS - 1, (focusCardIndex ?? 0) + 1));
  //   } else if (up) {
  //     if (!hand.at(focusCardIndex ?? 0)?.priority) {
  //       selectHandCard();
  //     }
  //   } else if (down) {
  //     if (hand.at(focusCardIndex ?? 0)?.priority) {
  //       selectHandCard();
  //     }
  //   } else if (buttonA || buttonB || buttonX || buttonY || start || select) {
  //     startFusion();
  //   }

  //   setFreeze(new Date(Date.now() + 15));
  // }, [
  //   focusCardIndex,
  //   hand,
  //   left,
  //   right,
  //   down,
  //   up,
  //   buttonA,
  //   buttonB,
  //   buttonX,
  //   buttonY,
  //   start,
  //   select,
  //   setFocusCard,
  //   selectHandCard,
  //   startFusion,
  // ]);
}
