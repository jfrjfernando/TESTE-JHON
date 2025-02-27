import { appendAssetsAPIPath } from "@/utils/path";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useSimulator } from "@/hooks/simulator.hook";
import { CardBaseType, CardMonsterType, CardType } from "@/models/card.model";
import { LongNumber } from "../molecules/LongNumber";
import { DrawFusion } from "./DrawFusion";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { findCardById } from "@/services/finder";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Card } from "../molecules/Card";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import { useWindowSize } from "@/hooks/window.hook";
import { LoadingSpinner } from "./LoadingSpinner";

export function CardStatsButton() {
  const { focusCard } = useSimulator();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!focusCard}
          className={"shadow-xl cursor-pointer group hover:shadow-md m-auto"}
        >
          STATS
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"h-[90vh] max-w-[825px] w-full pb-2 pt-3 overflow-y-auto"}
      >
        {focusCard && <StatsContent focusCard={focusCard} />}
      </DialogContent>
    </Dialog>
  );
}

export function StatsContent({
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
      <div className={"flex gap-4 mt-4 h-fit"}>
        <div className={"h-fit"}>
          <Card {...focusCard} index={-2} priority={undefined} />
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
              "text-3xl text-white bg-[#080106] px-4 py-2 overflow-hidden h-36 mt-0.5 border-l-2 overflow-y-auto"
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
      {!!focusCard.fusions?.length && (
        <AvailableFusions
          focusCard={focusCard}
          fusions={focusCard.fusions}
          fusionsContainerProps={fusionsContainerProps}
          height={height}
        />
      )}
      <DialogFooter>
        {password && price && (
          <div className={"flex justify-between items-end w-full"}>
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
}: {
  fusions: NonNullable<
    NonNullable<ReturnType<typeof useSimulator>["focusCard"]>["fusions"]
  >;
  focusCard: NonNullable<ReturnType<typeof useSimulator>["focusCard"]>;
  fusionsContainerProps?: React.HTMLProps<HTMLDivElement>;
  height?: number;
}) {
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

  const { width, columns, columnMode } = useMemo(() => {
    if (!containerWidth) {
      return {
        width: 940,
        columns: 3,
      };
    }

    if (containerWidth < 254) {
      return {
        width: 100,
        columns: 1,
        columnMode: true,
      };
    }

    if (containerWidth < 365) {
      return {
        width: 200,
        columns: 2,
        columnMode: true,
      };
    }

    if (containerWidth < 645) {
      return {
        width: 320,
        columns: 1,
      };
    }

    if (containerWidth < 920) {
      return {
        width: 620,
        columns: 2,
      };
    }

    return {
      width: 900,
      columns: 3,
    };
  }, [containerWidth]);

  return (
    <div ref={ref}>
      <p className={"text-center text-3xl text-white"}>
        FUSIONS ({cardFusions.length})
      </p>
      {containerWidth && containerWidth > 0 ? (
        <FixedSizeGrid
          height={height}
          columnWidth={columnMode ? 100 : width / columns}
          rowHeight={columnMode ? 380 : 100 + 3}
          columnCount={columns}
          rowCount={Math.ceil(cardFusions.length / columns)}
          width={width + 18}
          className={cn(
            "m-auto bg-[#080106] border-t-2 border-white",
            fusionsContainerProps?.className
          )}
          style={{
            overflowY: "scroll",
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
