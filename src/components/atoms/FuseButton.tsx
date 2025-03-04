import { useSimulator } from "@/hooks/simulator.hook";
import { ButtonHigh } from "./ButtonHigh";
import { ButtonHTMLAttributes, useMemo } from "preact/compat";
import { useFusion } from "@/hooks/fusion.hook";

export function FuseButton(props: ButtonHTMLAttributes) {
  const { hand } = useSimulator();
  const { startFusion, fusing } = useFusion();
  const disabled = useMemo(
    () => hand.filter((each) => each.priority).length < 2 || fusing,
    [hand, fusing]
  );

  return (
    <ButtonHigh
      id={"fuse-button"}
      disabled={disabled}
      {...props}
      class={"w-min px-10 text-5xl mb-[1vh] z-0"}
      onClick={() => startFusion()}
      aria-label={"Fuse button"}
    >
      FUSE
    </ButtonHigh>
  );
}
