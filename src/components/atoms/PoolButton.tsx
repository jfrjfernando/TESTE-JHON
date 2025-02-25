import { ButtonHTMLAttributes } from "preact/compat";
import { Button } from "./Button";

export function PoolButton(props: ButtonHTMLAttributes) {
  return (
    <Button class={"w-min py-0 pt-1 pb-1 pr-4 pl-4 text-[30px]"} {...props}>
      POOL
    </Button>
  );
}
