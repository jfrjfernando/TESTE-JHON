import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useStorage } from "@/hooks/storage.hook";
import { GroupType } from "@/models/group.model";
import { CheckBox } from "../atoms/CheckBox";
import { appendAssetsAPIPath, appendUrlPath } from "@/utils/path";
import { FRAME_SIZE } from "./Card";
import { selectGroups, unselectGroups } from "@/services/pool";
import { cn } from "@/lib/utils";
import { FixedSizeGrid } from "react-window";
import { useWindowScrollbarSize } from "@/hooks/window.hook";
import { useData } from "@/hooks/data.hook";

export function Pool() {
  const { groups, simulator } = useStorage();
  const { groups: defaultGroups } = useData();

  const allGroups = useMemo(
    () => [...groups, ...defaultGroups],
    [groups, defaultGroups]
  );

  const selectedGroups: (GroupType & {
    selected: boolean;
  })[] = useMemo(
    () =>
      allGroups.map((each) => ({
        ...each,
        selected: simulator.groups.some((group) => group.id === each.id),
      })),
    [allGroups, simulator.groups]
  );

  const selectedTotal = useMemo(
    () => selectedGroups.filter((group) => group.selected).length,
    [selectedGroups]
  );

  const totalPoolCards = useMemo(
    () =>
      selectedGroups
        .filter((each) => each.selected)
        .reduce((counter, each) => counter + each.cards.length, 0),
    [selectedGroups]
  );

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

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <Card>
        <CardHeader className={"pb-4 border-b-2"}>
          <CardTitle
            className={
              "text-3xl font-light text-center flex gap-3 items-center justify-between"
            }
          >
            <p>Pool ({selectedTotal})</p>
            <a
              className={cn(
                "flex gap-2 items-center hover:underline hover:text-yellow-200",
                selectedTotal < 1 && "sepia-100"
              )}
              href={appendUrlPath("/pool#pool-cards")}
            >
              <img
                src={appendAssetsAPIPath(
                  "/images/cards/frames/small_card.webp"
                )}
                alt={`Card frame`}
                width={FRAME_SIZE.width / 4}
                height={FRAME_SIZE.height / 4}
                style={{
                  imageRendering: "pixelated",
                }}
              />
              <p>{totalPoolCards}</p>
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent className={"m-auto"}>
          <PoolList containerWidth={containerWidth} />
        </CardContent>
      </Card>
    </div>
  );
}

export function PoolList({
  containerWidth,
  anchorTargetBlank,
}: {
  containerWidth: number;
  anchorTargetBlank?: boolean;
}) {
  const { groups, simulator } = useStorage();
  const { groups: defaultGroups } = useData();

  const allGroups = useMemo(
    () => [...groups, ...defaultGroups],
    [groups, defaultGroups]
  );

  const selectedGroups: (GroupType & {
    selected: boolean;
  })[] = useMemo(
    () =>
      allGroups.map((each) => ({
        ...each,
        selected: simulator.groups.some((group) => group.id === each.id),
      })),
    [allGroups, simulator.groups]
  );

  const toggleSelectGroup = useCallback(
    (group: GroupType) => {
      if (
        selectedGroups.some((each) => each.id === group.id && each.selected)
      ) {
        unselectGroups(group);
      } else {
        selectGroups(group);
      }
    },
    [selectGroups, unselectGroups, selectedGroups]
  );

  const width = useMemo(() => containerWidth - 55, [containerWidth]);

  const columns = useMemo(() => {
    if (!containerWidth) {
      return 3;
    }

    if (containerWidth < 533) {
      return 1;
    }

    if (containerWidth < 620) {
      return 2;
    }

    return 3;
  }, [containerWidth]);

  const height = 300;
  const columnMode = false;

  const scrollBarWidth = useWindowScrollbarSize();

  return (
    <FixedSizeGrid
      height={height}
      columnWidth={columnMode ? 100 : width / columns}
      rowHeight={42}
      columnCount={columns}
      rowCount={Math.ceil(selectedGroups.length / columns)}
      width={width + scrollBarWidth}
      style={{
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * columns + columnIndex;

        if (selectedGroups.length <= index) {
          return null;
        }

        const group = selectedGroups[index];

        return (
          <div
            className={"flex items-center gap-2 overflow-x-hidden"}
            style={style}
          >
            <CheckBox
              value={selectedGroups.some(
                (each) => each.id === group.id && each.selected
              )}
              setValue={() => toggleSelectGroup(group)}
            />
            <a
              href={appendUrlPath(`/groups/${group.id}`)}
              className={"hover:text-yellow-200 text-xl hover:underline"}
              target={anchorTargetBlank ? "_blank" : undefined}
            >
              {group.name}
            </a>
          </div>
        );
      }}
    </FixedSizeGrid>
  );
}
