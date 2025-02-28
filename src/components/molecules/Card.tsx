import { CardBaseType, CardType, IdType } from "@/models/card.model";
import { appendAssetsAPIPath, appendUrlPath } from "@/utils/path";
import { LongNumber } from "./LongNumber";
import { useFusion } from "@/hooks/fusion.hook";
import { cn } from "@/lib/utils";

export type CardAssemblerProps = {
  id: CardBaseType["id"];
  icon: CardBaseType["icon"];
  cardType: CardType;
  attack?: number;
  defense?: number;
  focus?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  priority?: number;
  index: number;
  props?: React.HTMLAttributes<HTMLDivElement>;
};

export const CARD_FRAMES = {
  MONSTER: appendAssetsAPIPath("/images/cards/frames/monster.webp"),
  EQUIP: appendAssetsAPIPath("/images/cards/frames/equip.webp"),
  TRAP: appendAssetsAPIPath("/images/cards/frames/trap.webp"),
  RITUAL: appendAssetsAPIPath("/images/cards/frames/ritual.webp"),
  MAGIC: appendAssetsAPIPath("/images/cards/frames/magic.webp"),
  FIELD: appendAssetsAPIPath("/images/cards/frames/magic.webp"),
} as const satisfies {
  [K in keyof typeof CardType]: string;
};

export const FRAME_SIZE = {
  width: 122,
  height: 153,
};

export const GET_CARD_ELEMENT = (id: IdType, index: number) =>
  `hand-card-${id}-${index}`;

export function Card({
  id,
  icon,
  cardType,
  attack,
  defense,
  focus,
  onClick,
  onHover,
  priority,
  index,
  props,
}: CardAssemblerProps) {
  const { fusing } = useFusion();

  return (
    <div
      id={GET_CARD_ELEMENT(id, index)}
      className={cn(
        "relative w-[122px] h-[153px]",
        !fusing && "hover:drop-shadow-[0_0_10px_rgb(255_225_0_/_40%)]",
        props?.className
      )}
      style={{
        cursor: !fusing ? "pointer" : "not-allowed",
        pointerEvents: !onClick ? "none" : undefined,
        userSelect: "none",
        transform: !fusing && priority ? "translate(0, -8%)" : undefined,
        boxShadow: "none",
      }}
      onClick={() => !fusing && onClick?.()}
      onMouseOver={() => !fusing && onHover?.()}
    >
      {!fusing && priority && (
        <div
          className={"absolute z-40"}
          style={{
            transform: "translate(-50%, 10%)",
            left: "21px",
          }}
        >
          <div
            className={
              "h-7 w-11 text-center bg-gray-900 text-3xl rounded-sm border-2 border-white text-blue-300"
            }
          >
            <p className={"-translate-y-[5px]"}>{priority}</p>
          </div>
        </div>
      )}
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
          top: "9px",
          imageRendering: "pixelated",
        }}
      >
        <img
          src={appendAssetsAPIPath(icon)}
          alt={`Card icon`}
          width={FRAME_SIZE.width * 0.85}
          height={FRAME_SIZE.height * 0.82}
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
            bottom: "26px",
          }}
        >
          <LongNumber numbers={attack} width={19} height={25} />
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
            bottom: "3px",
          }}
        >
          <LongNumber numbers={defense} width={19} height={25} />
        </div>
      )}

      {focus && !fusing && (
        <img
          className={"relative z-30"}
          src={appendUrlPath("/images/red_arrow.gif")}
          width={40}
          height={30}
          alt={"Selected arrow"}
          style={{
            imageRendering: "pixelated",
            transform: "translate(-28px, 110px)",
          }}
        />
      )}
    </div>
  );
}
