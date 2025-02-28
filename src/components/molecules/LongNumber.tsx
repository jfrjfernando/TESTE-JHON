import { cn } from "@/lib/utils";
import { NumberFont } from "../atoms/NumberFont";
import { useMemo } from "preact/hooks";

export function LongNumber({
  numbers,
  width,
  height,
  props,
}: {
  numbers: number;
  width?: number;
  height?: number;
  props?: React.HTMLProps<HTMLImageElement>;
}) {
  const stringNumbers = useMemo(() => String(numbers), [numbers]);
  const rest = useMemo(
    () => (stringNumbers.length < 4 ? 4 - stringNumbers.length : 0),
    [stringNumbers]
  );

  return (
    <div
      className={cn(
        "flex gap-[1px] select-none pointer-events-none",
        `h-[${height}px]`
      )}
    >
      {rest > 0 &&
        Array.from({ length: rest }).map(() => (
          <NumberFont
            number={0}
            width={width}
            height={height}
            props={{
              ...props,
              style: {
                opacity: "0"
              }
            }}
          />
        ))}
      {stringNumbers.split("").map((number) => (
        <NumberFont
          number={Number(number)}
          width={width}
          height={height}
          props={props}
        />
      ))}
    </div>
  );
}
