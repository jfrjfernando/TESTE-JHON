import { createEmptyGroup } from "@/services/group";
import { Button } from "../ui/button";
import { useCallback } from "preact/hooks";
import { useRouter } from "preact-router";
import { appendUrlPath } from "@/utils/path";
import { Plus } from "lucide-react";

export function GroupAddButton() {
  const [, push] = useRouter();
  const createGroup = useCallback(() => {
    const newGroup = createEmptyGroup();

    push(appendUrlPath(`/groups/${newGroup.id}`));
  }, [createEmptyGroup, push]);

  return (
    <Button
      className={
        "w-full h-full py-6 bg-card hover:bg-background  border border-foreground"
      }
      onClick={() => createGroup()}
      aria-label={"Add group button"}
    >
      <Plus className={"!w-8 !h-8 text-active"} />
    </Button>
  );
}
