import { useStorage } from "@/hooks/storage.hook";
import { DEFAULT_GROUPS } from "@/models/data/groups";
import { useRouter } from "preact-router";
import { useMemo } from "preact/hooks";
import { GroupFull } from "../organisms/GroupFull";
import { NotFound } from "../atoms/NotFound";

export function GroupPage() {
  const [
    {
      // "id" could be an ID and a same
      matches: { id },
    },
  ] = useRouter() as any;

  if (!id) {
    return <></>;
  }

  const { groups } = useStorage();

  const allGroups = useMemo(
    () => [
      ...groups.map((each) => ({ ...each, editable: true })),
      ...DEFAULT_GROUPS,
    ],
    [groups, DEFAULT_GROUPS]
  );

  const findGroup = useMemo(
    () => allGroups.find((each) => each.id === id),
    [allGroups]
  );

  if (!findGroup) {
    return <NotFound />;
  }

  return (
    <main className={"!max-w-[960px]"}>
      <GroupFull group={findGroup} />
    </main>
  );
}
