import { appendAssetsAPIPath } from "@/utils/path";

export function CardStatsButton() {
  return (
    <img
      src={appendAssetsAPIPath("/images/cards/frames/small_card.webp")}
      alt={"Card stats"}
      width={48 * 0.8}
      height={56 * 0.8}
      style={{
        imageRendering: "pixelated",
      }}
      className={
        "shadow-xl cursor-pointer hover:translate-y-0.5 hover:shadow-md hover:border-rose-50 hover:border"
      }
    />
  );
}
