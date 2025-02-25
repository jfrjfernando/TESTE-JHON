import { appendAssetsAPIPath } from "@/utils/path";

const numbers = {
  0: appendAssetsAPIPath("/images/numbers/0.webp"),
  1: appendAssetsAPIPath("/images/numbers/1.webp"),
  2: appendAssetsAPIPath("/images/numbers/2.webp"),
  3: appendAssetsAPIPath("/images/numbers/3.webp"),
  4: appendAssetsAPIPath("/images/numbers/4.webp"),
  5: appendAssetsAPIPath("/images/numbers/5.webp"),
  6: appendAssetsAPIPath("/images/numbers/6.webp"),
  7: appendAssetsAPIPath("/images/numbers/7.webp"),
  8: appendAssetsAPIPath("/images/numbers/8.webp"),
  9: appendAssetsAPIPath("/images/numbers/9.webp"),
} as const satisfies {
  [K: number]: string;
};

export function NumberFont({
  number,
  props,
  width = 7,
  height = 8,
}: {
  number: number;
  props?: React.HTMLProps<HTMLImageElement>;
  width?: HTMLImageElement["width"];
  height?: HTMLImageElement["height"];
}) {
  const fixNumber = Math.max(Math.min(9, number), 0);
  const source = numbers[fixNumber as keyof typeof numbers];

  return (
    <img
      src={source}
      alt={`${fixNumber}`}
      {...props}
      width={width}
      height={height}
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
}
