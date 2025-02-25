import { appendAssetsAPIPath } from "@/utils/path";
import { FRAME_SIZE } from "../molecules/CardAssembler";

export function CardUnknown() {
  return (
    <img
      className={"shadow-lg shadow-black -z-10"}
      src={appendAssetsAPIPath("/images/cards/frames/unknown.webp")}
      alt={"Unknown card"}
      width={FRAME_SIZE.width}
      height={FRAME_SIZE.height}
      style={{
        imageRendering: "pixelated",
        filter: "sepia(1)",
        opacity: "30%",
      }}
    />
  );
}
