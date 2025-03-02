import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useSimulator } from "@/hooks/simulator.hook";
import { DivButton } from "./DivButton";
import { CardStats } from "../organisms/CardStats";
import { HTMLAttributes } from "preact/compat";
import { cn } from "@/lib/utils";

export function CardStatsButton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { focusCard } = useSimulator();

  return (
    <Dialog>
      <DialogTrigger>
        <DivButton
          disabled={!focusCard}
          className={cn(
            "shadow-xl cursor-pointer group hover:shadow-md m-auto text-[30px] py-0",
            className
          )}
          aria-label={"Card stats button"}
          {...props}
        >
          STATS
        </DivButton>
      </DialogTrigger>
      <DialogContent
        className={"h-[90vh] max-w-[825px] w-full pb-2 pt-3 overflow-y-auto"}
      >
        {focusCard && <CardStats focusCard={focusCard} />}
      </DialogContent>
    </Dialog>
  );
}
