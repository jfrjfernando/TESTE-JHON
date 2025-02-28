import { createEmptyGroup } from "@/services/group";
import { Button } from "../ui/button";
import { useCallback } from "preact/hooks";
import { useRouter } from "preact-router";
import { appendUrlPath } from "@/utils/path";

export function GroupAddButton() {
  const [, push] = useRouter();
  const createGroup = useCallback(() => {
    const newGroup = createEmptyGroup();

    push(appendUrlPath(`/groups/${newGroup.id}`));
  }, [createEmptyGroup, push]);

  return (
    <Button
      className={"w-full h-full py-6 bg-card hover:bg-background"}
      onClick={() => createGroup()}
    >
      <p className={"text-white text-4xl"}>+</p>
    </Button>
  );
}
