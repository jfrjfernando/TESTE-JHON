import { NumberFont } from "../atoms/NumberFont";

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
  return (
    <div className={"flex gap-[1px]"}>
      {String(numbers)
        .split("")
        .map((number) => (
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
