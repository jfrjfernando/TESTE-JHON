import { useStorage } from "@/hooks/storage.hook";
import { CardBaseType, IdType } from "@/models/card.model";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Pool } from "../molecules/Pool";
import { FixedSizeGrid } from "react-window";
import { MiniCard } from "../molecules/MiniCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useWindowScrollbarSize } from "@/hooks/window.hook";
import { useData } from "@/hooks/data.hook";
import { useCards } from "@/hooks/cards.hook";

export function PoolPage() {
  const { groups, simulator } = useStorage();
  const { groups: defaultGroups } = useData();
  const { findCardById } = useCards();

  const allGroups = useMemo(
    () =>
      [...groups, ...defaultGroups].map((each) => ({
        ...each,
        cards: each.cards
          .map((card) => findCardById(card as IdType))
          .filter((each) => !!each),
      })),
    [groups, defaultGroups]
  );

  const cards = useMemo(
    () =>
      allGroups
        .filter((each) =>
          simulator.groups.some((group) => group.id === each.id)
        )
        .reduce((array, each) => {
          array.push(...each.cards);
          return array;
        }, [] as CardBaseType[]),
    [allGroups, simulator.groups]
  );

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

  const width = useMemo(() => containerWidth - 55, [containerWidth]);

  const columns = useMemo(() => {
    if (!containerWidth) {
      return 11;
    }

    if (containerWidth < 235) {
      return 1;
    }

    if (containerWidth < 306) {
      return 2;
    }

    if (containerWidth < 381) {
      return 3;
    }

    if (containerWidth < 452) {
      return 4;
    }

    if (containerWidth < 531) {
      return 5;
    }

    if (containerWidth < 616) {
      return 6;
    }

    if (containerWidth < 701) {
      return 7;
    }

    if (containerWidth < 786) {
      return 8;
    }

    if (containerWidth < 805) {
      return 8;
    }

    if (containerWidth < 900) {
      return 10;
    }

    if (containerWidth < 971) {
      return 11;
    }

    return 11;
  }, [containerWidth]);

  const height = 500;
  const columnMode = false;

  const scrollBarWidth = useWindowScrollbarSize();

  return (
    <main className={"!max-w-[960px]"}>
      <div ref={ref} className={"flex flex-col gap-4"}>
        <Pool />
        <Card id={"pool-cards"}>
          <CardHeader>
            <CardTitle className={"text-3xl font-light"}>
              Cards ({cards.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FixedSizeGrid
              height={height}
              columnWidth={columnMode ? 100 : width / columns}
              rowHeight={94}
              columnCount={columns}
              rowCount={Math.ceil(cards.length / columns)}
              width={width + scrollBarWidth}
              style={{
                overflowY: "scroll",
              }}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columns + columnIndex;

                if (cards.length <= index) {
                  return null;
                }

                const card = cards[index];

                return (
                  <div
                    style={{
                      ...style,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MiniCard key={card} {...card} />
                  </div>
                );
              }}
            </FixedSizeGrid>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
