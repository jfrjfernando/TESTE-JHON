import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { FixedSizeGrid } from "react-window";
import { DrawFusion } from "../atoms/DrawFusion";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useWindowScrollbarSize } from "@/hooks/window.hook";
import { useCards } from "@/hooks/cards.hook";
import { useSimulator } from "@/hooks/simulator.hook";
import { CardBaseType } from "@/models/card.model";

export function FusionsGrid({
  fusions,
  card,
  fusionsContainerProps,
  maxHeight = 350,
  equips,
  reverse,
  title,
}: {
  fusions: NonNullable<
    NonNullable<ReturnType<typeof useSimulator>["focusCard"]>["fusions"]
  >;
  card: NonNullable<ReturnType<typeof useSimulator>["focusCard"]>;
  fusionsContainerProps?: React.HTMLProps<HTMLDivElement>;
  maxHeight?: number;
  equips?: CardBaseType["id"][];
  reverse?: boolean;
  title: (total: number) => React.ReactElement;
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

    if (!reverse) {
      for (const equip of equips ?? []) {
        const findTarget = findCardById(equip);

        if (!findTarget) {
          continue;
        }

        response.push([findTarget, card]);
      }
    }

    return response;
  }, [fusions, reverse]);

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

  const height = useMemo(
    () =>
      Math.min(
        maxHeight,
        (columnMode ? 380 : 100 + 3) * Math.ceil(cardFusions.length / columns) +
          12
      ),
    [maxHeight, columnMode, cardFusions, columns]
  );

  const scrollBarWidth = useWindowScrollbarSize();

  return (
    <div ref={ref}>
      {title(cardFusions.length)}
      <span className={"h-4"} />
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
            marginTop: "15px",
            marginBottom: "15px",
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
                  source={!reverse ? card : result}
                  target={target}
                  result={!reverse ? result : card}
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
