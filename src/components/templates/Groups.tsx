import { useStorage } from "@/hooks/storage.hook";
import { DEFAULT_GROUPS } from "@/models/data/groups";
import { useMemo } from "preact/hooks";
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
import { useRouter } from "preact-router";

export function Groups() {
  const { groups, simulator } = useStorage();
  const allGroups = useMemo(() => {
    const result = [...groups, ...DEFAULT_GROUPS].slice(0, 10);

    // Sort groups selected by simulator first
    result.sort((a, b) => {
      if (simulator.groups.some((each) => each.id === a.id)) return -1;
      if (simulator.groups.some((each) => each.id === b.id)) return 1;
      return 0;
    });

    return result;
  }, [groups]);

  const [{matches}, push] = useRouter();

  console.log(a);

  return (
    <section>
      <div id={"groups-section"} className={"flex flex-col gap-4"}>
        {allGroups.map((group) => (
          <Group key={group} group={group} />
        ))}
      </div>
      <div className={"my-4"}>
        <Card className={"py-2 m-0"}>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
