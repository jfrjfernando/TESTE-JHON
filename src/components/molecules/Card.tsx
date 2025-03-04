import { CardBaseType, CardType, IdType } from "@/models/card.model";
import { appendAssetsAPIPath, appendUrlPath } from "@/utils/path";
import { LongNumber } from "./LongNumber";
import { useFusion } from "@/hooks/fusion.hook";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { MiniCard } from "./MiniCard";

/**
 * [priority, result]
 */
export type PredictedFusionSlot =
  | [number, CardBaseType | undefined]
  | undefined;

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
  predictedChannels?: PredictedFusionSlot[];
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
  predictedChannels,
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
      {predictedChannels && (
        <div className={"w-full"}>
          <div className={"w-full flex justify-between"}>
            <div
              className={
                "absolute z-40 flex justify-between w-full -translate-y-[93%]"
              }
            >
              {predictedChannels[0] ? (
                <PredictedChannel
                  value={predictedChannels[0]}
                  className="bg-red-400"
                />
              ) : (
                <span className={"w-6 h-7"} />
              )}
              {predictedChannels[1] ? (
                <PredictedChannel
                  value={predictedChannels[1]}
                  className="bg-yellow-400"
                />
              ) : (
                <span className={"w-6 h-7"} />
              )}
              {predictedChannels[2] ? (
                <PredictedChannel
                  value={predictedChannels[2]}
                  className="bg-blue-400"
                />
              ) : (
                <span className={"w-6 h-7"} />
              )}
              {predictedChannels[3] ? (
                <PredictedChannel
                  value={predictedChannels[3]}
                  className="bg-white"
                />
              ) : (
                <span className={"w-6 h-7"} />
              )}
              {predictedChannels[4] ? (
                <PredictedChannel
                  value={predictedChannels[4]}
                  className="bg-purple-400"
                />
              ) : (
                <span className={"w-6 h-7"} />
              )}
            </div>
          </div>
        </div>
      )}

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
          <LongNumber hiddenNumbers numbers={attack} width={19} height={25} />
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
          <LongNumber hiddenNumbers numbers={defense} width={19} height={25} />
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

function PredictedChannel({
  value: [priority, result],
  className,
}: {
  value: NonNullable<PredictedFusionSlot>;
  className: HTMLDivElement["className"];
}) {
  const element = (
    <div
      className={cn("w-6 h-7 rounded-sm border hover:opacity-40", className)}
    >
      <p className={"text-black text-center text-xl"}>{priority}</p>
    </div>
  );

  if (priority > 1) {
    return (
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>{element}</HoverCardTrigger>
        <HoverCardContent
          className={cn(
            "pointer-events-none p-2 -translate-y-[140px] bg-transparent shadow-none flex items-center justify-center w-min",
            className
          )}
        >
          {result && <MiniCard {...result} />}
        </HoverCardContent>
      </HoverCard>
    );
  }

  return element;
}
