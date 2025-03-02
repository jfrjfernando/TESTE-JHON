import { useSimulator } from "@/hooks/simulator.hook";
import { CardBaseType, CardMonsterType, CardType } from "@/models/card.model";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { appendAssetsAPIPath } from "@/utils/path";
import { Card } from "../molecules/Card";
import { LongNumber } from "../molecules/LongNumber";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { FixedSizeGrid } from "react-window";
import { DrawFusion } from "../atoms/DrawFusion";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useWindowScrollbarSize } from "@/hooks/window.hook";
import { useCards } from "@/hooks/cards.hook";

export function CardStats({
  focusCard,
  fusionsContainerProps,
  height,
}: {
  focusCard: NonNullable<ReturnType<typeof useSimulator>["focusCard"]>;
  fusionsContainerProps?: React.HTMLProps<HTMLDivElement>;
  height?: number;
}) {
  const { id, name, description, price, password, groups } = focusCard;

  const { level } = (focusCard as CardMonsterType) || {};

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {level && level > 1 ? (
            <div className={"flex gap-0.5 justify-center mb-2"}>
              {Array.from({ length: level }).map((_, index) => (
                <img
                  key={index}
                  src={appendAssetsAPIPath(`/images/assets/star.webp`)}
                  alt={"Type icon"}
                  width={"22px"}
                  height={"22px"}
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
              ))}
            </div>
          ) : (
            <div className={"h-[22px]"}></div>
          )}
          <div
            className={
              "flex gap-2 overflow-hidden font-light justify-between bg-[#080106] px-3 py-2 mt-2 rounded-[4px] shadow-lg shadow-gray-950"
            }
          >
            <p className={"text-3xl text-red-300"}>{id}</p>
            <p className={"text-3xl text-slate-300 text-nowrap"}>{name}</p>
            {focusCard.cardType === CardType.MONSTER ? (
              <img
                src={appendAssetsAPIPath(
                  `/images/types/${(
                    focusCard as CardMonsterType
                  ).type.toLowerCase()}.webp`
                )}
                alt={"Type icon"}
                width={"36px"}
                height={"36px"}
                style={{
                  imageRendering: "pixelated",
                }}
              />
            ) : (
              <img
                src={appendAssetsAPIPath(
                  focusCard.cardType === CardType.TRAP
                    ? "/images/types/fiend.webp"
                    : focusCard.cardType === CardType.FIELD
                    ? "/images/types/aqua.webp"
                    : focusCard.cardType === CardType.EQUIP
                    ? "/images/types/warrior.webp"
                    : focusCard.cardType === CardType.MAGIC
                    ? "/images/types/spellcaster.webp"
                    : focusCard.cardType === CardType.RITUAL
                    ? "/images/types/zombie.webp"
                    : "/images/types/spellcaster.webp"
                )}
                alt={"Type icon"}
                width={"36px"}
                height={"36px"}
                style={{
                  imageRendering: "pixelated",
                }}
              />
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
      <div
        className={
          "flex gap-4 mt-4 h-fit max-[420px]:flex-col max-[420px]:items-center max-[420px]:mb-4"
        }
      >
        <div className={"h-fit"}>
          <Card {...focusCard} index={-2} priority={undefined} focus={false} />
          <div className={"flex gap-1 justify-center mt-1 items-center"}>
            {focusCard.cardType === CardType.MONSTER ? (
              <>
                <img
                  src={appendAssetsAPIPath(
                    `/images/guardians/${(
                      focusCard as CardMonsterType
                    ).guardians[0].toLowerCase()}.webp`
                  )}
                  alt={"Guardian icon"}
                  width={"36px"}
                  height={"36px"}
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
                <img
                  src={appendAssetsAPIPath(
                    `/images/guardians/${(
                      focusCard as CardMonsterType
                    ).guardians[1].toLowerCase()}.webp`
                  )}
                  alt={"Guardian icon"}
                  width={"36px"}
                  height={"36px"}
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={"h-fit w-full"}>
          <p
            className={
              "text-3xl text-white bg-[#080106] px-4 py-2 overflow-hidden h-36 mt-0.5 border-l-2 overflow-y-auto max-[600px]:text-xl"
            }
            style={{
              borderRadius: "4px",
            }}
          >
            {description}
          </p>
          <p className={"text-gray-300 text-lg text-center"}>
            {groups.map((each) => each).join(", ")}
          </p>
        </div>
      </div>
      {(!!focusCard.fusions?.length ||
        !!(focusCard as CardMonsterType)?.equips?.length) && (
        <AvailableFusions
          focusCard={focusCard}
          fusions={focusCard.fusions ?? []}
          fusionsContainerProps={fusionsContainerProps}
          height={height}
          equips={(focusCard as CardMonsterType)?.equips ?? []}
        />
      )}
      <DialogFooter>
        {password && price && (
          <div className={"flex justify-between items-end w-full gap-3"}>
            <div>
              <LongNumber numbers={Number(price)} width={19} height={19} />
            </div>
            <div>
              <LongNumber numbers={Number(password)} width={19} height={19} />
            </div>
          </div>
        )}
      </DialogFooter>
    </>
  );
}

function AvailableFusions({
  fusions,
  focusCard,
  fusionsContainerProps,
  height = 350,
  equips,
}: {
  fusions: NonNullable<
    NonNullable<ReturnType<typeof useSimulator>["focusCard"]>["fusions"]
  >;
  focusCard: NonNullable<ReturnType<typeof useSimulator>["focusCard"]>;
  fusionsContainerProps?: React.HTMLProps<HTMLDivElement>;
  height?: number;
  equips?: CardBaseType["id"][];
}) {
  const { findCardById } = useCards();

  const cardFusions = useMemo((): [CardBaseType, CardBaseType][] => {
    const response: [CardBaseType, CardBaseType][] = [];

    for (const [target, result] of fusions) {
      const findTarget = findCardById(target);
      const findResult = findCardById(result);

      if (!findTarget || !findResult) {
        continue;
      }

      response.push([findTarget, findResult]);
    }

    for (const equip of equips ?? []) {
      const findTarget = findCardById(equip);

      if (!findTarget) {
        continue;
      }

      response.push([findTarget, focusCard]);
    }

    return response;
  }, [fusions]);
  const ref = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(-1);

  useEffect(() => {
    if (!ref.current) return;

    const updateWidth = () => {
      if (ref.current) {
        setContainerWidth(ref.current.getBoundingClientRect().width);
      }
    };

    const observer = new ResizeObserver(updateWidth);
    observer.observe(ref.current);

    updateWidth();

    return () => observer.disconnect();
  }, []);

  const width = useMemo(() => containerWidth - 30, [containerWidth]);

  const { columns, columnMode } = useMemo(() => {
    if (!containerWidth) {
      return {
        columns: 3,
      };
    }

    if (containerWidth < 180) {
      return {
        columns: 1,
        columnMode: true,
      };
    }

    if (containerWidth < 320) {
      return {
        columns: 2,
        columnMode: true,
      };
    }

    if (containerWidth < 383) {
      return {
        columns: 1,
      };
    }

    if (containerWidth < 645) {
      return {
        columns: 1,
      };
    }

    if (containerWidth < 920) {
      return {
        columns: 2,
      };
    }

    return {
      columns: 3,
    };
  }, [containerWidth]);

  const scrollBarWidth = useWindowScrollbarSize();

  return (
    <div ref={ref}>
      <p className={"text-center text-3xl text-white"}>
        FUSIONS ({cardFusions.length})
      </p>
      {containerWidth && containerWidth > 0 ? (
        <FixedSizeGrid
          height={height}
          columnWidth={width / columns}
          rowHeight={columnMode ? 380 : 100 + 3}
          columnCount={columns}
          rowCount={Math.ceil(cardFusions.length / columns)}
          width={width + scrollBarWidth}
          className={cn(
            "m-auto bg-[#080106] border-t-2 border-white",
            fusionsContainerProps?.className
          )}
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {({ columnIndex, rowIndex, style }) => {
            const index = rowIndex * columns + columnIndex;

            if (cardFusions.length <= index) {
              return null;
            }

            const [target, result] = cardFusions[index];

            return (
              <div
                style={{
                  ...style,
                  marginTop: rowIndex === 0 ? "5px" : undefined,
                }}
                className={"flex items-center justify-center"}
                key={`${columnIndex}-${rowIndex}`}
              >
                <DrawFusion
                  columnMode={columnMode}
                  source={focusCard}
                  target={target}
                  result={result}
                />
              </div>
            );
          }}
        </FixedSizeGrid>
      ) : (
        <>
          <div className={"flex justify-center my-4"}>
            <LoadingSpinner />
          </div>
        </>
      )}
    </div>
  );
}
