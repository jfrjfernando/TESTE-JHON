import { CardBaseType, IdType } from "@/models/card.model";
import { appendAssetsAPIPath } from "@/utils/path";
import { LongNumber } from "./LongNumber";
import { useFusion } from "@/hooks/fusion.hook";

export type CardAssemblerProps = {
  id: CardBaseType["id"];
  icon: CardBaseType["icon"];
  frame: keyof typeof CARD_FRAMES;
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
  monster: appendAssetsAPIPath("/images/cards/frames/monster.webp"),
  equip: appendAssetsAPIPath("/images/cards/frames/equip.webp"),
  trap: appendAssetsAPIPath("/images/cards/frames/trap.webp"),
  ritual: appendAssetsAPIPath("/images/cards/frames/ritual.webp"),
  magic: appendAssetsAPIPath("/images/cards/frames/magic.webp"),
} as const satisfies {
  [K: string]: string;
};

export const FRAME_SIZE = {
  width: 122,
  height: 153,
};

export const GET_CARD_ELEMENT = (id: IdType, index: number) =>
  `hand-card-${id}-${index}`;

export function CardAssembler({
  id,
  icon,
  frame,
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
      className={`relative w-[122px] h-[153px] ${
        !fusing
          ? "hover:drop-shadow-[0_0_10px_rgb(255_225_0_/_40%)]"
          : undefined
      } ${props?.className}`}
      style={{
        cursor: !fusing ? "pointer" : "not-allowed",
        pointerEvents: !onClick ? "none" : undefined,
        userSelect: "none",
        transform: !fusing && priority ? "translate(0, -8%)" : undefined,
        // TODO: Add an array gif like in the game
        // animation:
        //   !fusing && focus ? "cardShadowChange 2s infinite" : undefined,
        boxShadow: "none",
      }}
      onClick={() => !fusing && onClick?.()}
      onMouseOver={() => !fusing && onHover?.()}
    >
      {!fusing && priority && (
        <div
          className={"absolute z-50"}
          style={{
            transform: "translate(-50%, -60%)",
            left: "50%",
          }}
        >
          <div
            className={
              "h-10 w-10 text-center bg-slate-500 text-3xl rounded-full border-2 border-slate-300 text-slate-300"
            }
          >
            {priority}
          </div>
        </div>
      )}
      <img
        className={"absolute z-20"}
        src={CARD_FRAMES[frame]}
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
    </div>
  );
}
