import { CardBaseType, CardMonsterType } from "@/models/card.model";
import { appendAssetsAPIPath, appendUrlPath } from "@/utils/path";
import { LongNumber } from "./LongNumber";
import { CARD_FRAMES, FRAME_SIZE } from "./Card";
import { cn } from "@/lib/utils";

export type MiniCardAssemblerProps = CardBaseType & {
  redirectClick?: "new-tab" | "same-tab";
} & Partial<CardMonsterType>;

export function MiniCard({
  id,
  icon,
  attack,
  defense,
  cardType,
}: MiniCardAssemblerProps) {
  return (
    <a href={appendUrlPath(`/cards/${id}`)}>
      <div
        className={cn(
          "relative w-[72px] h-[90px]",
          "hover:drop-shadow-[0_0_10px_rgb(255_225_0_/_40%)] hover:scale-[1.05] transition-all duration-200"
        )}
        style={{
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <img
          className={"absolute z-20"}
          src={CARD_FRAMES[cardType]}
          alt={`Card frame`}
          width={FRAME_SIZE.width}
          height={FRAME_SIZE.height}
          style={{
            imageRendering: "pixelated",
          }}
        />
        <div
          className={"z-10 absolute"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            top: "0px",
            imageRendering: "pixelated",
          }}
        >
          <img
            src={appendAssetsAPIPath(icon)}
            alt={`Card icon`}
            width={(FRAME_SIZE.width * 0.85) / 1.7}
            height={(FRAME_SIZE.height * 0.82) / 1.7}
            className={"translate-y-[3px]"}
          />
        </div>
        {attack !== undefined && (
          <div
            className={"z-30 absolute"}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              width: "100%",
              height: "100%",
              right: "8px",
              bottom: "15px",
            }}
          >
            <LongNumber numbers={attack} width={11} height={11} />
          </div>
        )}
        {defense !== undefined && (
          <div
            className={"z-30 absolute"}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              width: "100%",
              height: "100%",
              right: "8px",
              bottom: "2px",
            }}
          >
            <LongNumber numbers={defense} width={11} height={11} />
          </div>
        )}
      </div>
    </a>
  );
}
