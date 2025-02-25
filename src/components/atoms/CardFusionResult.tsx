import { appendAssetsAPIPath } from "@/utils/path";
import { FRAME_SIZE } from "../molecules/CardAssembler";

export function CardFusionResult() {
  return (
    <img
      className={"absolute z-20 left-[45.3%] top-[40%] animate-spin"}
      src={appendAssetsAPIPath("/images/cards/frames/unknown.webp")}
      alt={`Card frame`}
      width={FRAME_SIZE.width}
      height={FRAME_SIZE.height}
      style={{
        imageRendering: "pixelated",
        filter: "sepia(100%)",
      }}
    />
  );
}
