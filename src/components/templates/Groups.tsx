import { useStorage } from "@/hooks/storage.hook";
import { DEFAULT_GROUPS } from "@/models/data/groups";
import { useCallback, useMemo } from "preact/hooks";
import { Group } from "../organisms/Group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Card, CardContent } from "../ui/card";
import { usePaginationURL } from "@/hooks/pagination.hook";
import { GroupType } from "@/models/group.model";

export function Groups() {
  const { groups, simulator } = useStorage();
  const allGroups = useMemo(() => {
    const result = [
      ...groups.map((each) => ({
        ...each,
        editable: true,
      })),
      ...DEFAULT_GROUPS,
    ];

    // Sort groups selected by simulator first
    result.sort((a, b) => {
      const aGroup = simulator.groups.find(
        (each) => each.id === a.id
      )?.timestamp;
      const bGroup = simulator.groups.find(
        (each) => each.id === b.id
      )?.timestamp;

      if (aGroup && bGroup) {
        return bGroup - aGroup;
      }

      if (aGroup) {
        return -1;
      }

      if (bGroup) {
        return 1;
      }

      return 0;
    });

    return result;
  }, [groups]);

  const { view, next, previous, page, setPage, allPages } =
    usePaginationURL<GroupType>(allGroups, 8);

  const pushToUp = useCallback(() => {
    const element = document.getElementById("groups-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <section>
      <div id={"groups-section"} className={"flex flex-col gap-4"}>
        {view.map((group) => (
          <Group key={group} group={group} />
        ))}
      </div>
      <div className={"my-4"}>
        <Card className={"py-2 m-0"}>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem
                  className={page <= 1 ? "opacity-45 pointer-events-none" : ""}
                >
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      previous();
                      pushToUp();
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: allPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(index + 1);
                        pushToUp();
                      }}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem
                  className={
                    page >= allPages ? "opacity-45 pointer-events-none" : ""
                  }
                >
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      next();
                      pushToUp();
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
