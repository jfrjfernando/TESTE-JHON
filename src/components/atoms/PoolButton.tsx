import { HTMLAttributes, useEffect, useRef, useState } from "preact/compat";
import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PoolList } from "../molecules/Pool";
import { DivButton } from "./DivButton";

export function PoolButton(props: HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(-1);

  useEffect(() => {
    if (!ref.current) return;

    const updateWidth = () => {
      if (ref.current) {
        setContainerWidth(ref.current.getBoundingClientRect().width);
      }
    };

    const observer = new ResizeObserver(updateWidth);
    observer.observe(ref.current);

    updateWidth();

    return () => {
      observer.disconnect();
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <DivButton
          class={"w-min py-0 pt-1 pb-1 pr-4 pl-4 text-[30px]"}
          {...props}
        >
          POOL
        </DivButton>
      </DialogTrigger>
      <DialogContent className={"!max-w-[825px]"}>
        <DialogTitle className={"text-3xl font-light"}>Pool</DialogTitle>
        <div ref={ref} className={"flex items-center justify-center"}>
          <PoolList containerWidth={containerWidth} anchorTargetBlank />
        </div>
        <DialogFooter>
          <Button className={"m-auto py-0 px-2"} onClick={() => setOpen(false)}>
            Back
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
