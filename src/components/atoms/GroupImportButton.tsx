import { GroupModel, GroupType } from "@/models/group.model";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useMemo, useState } from "preact/hooks";
import { ImportIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { createGroup } from "@/services/group";
import { useRouter } from "preact-router";
import { appendUrlPath } from "@/utils/path";

export function GroupImportButton() {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>();
  const [, push] = useRouter();

  const validGroup: GroupType | false = useMemo(() => {
    if (!text?.length) {
      return false;
    }

    try {
      const rawGroup = JSON.parse(text);

      return GroupModel.validateSync(rawGroup);
    } catch {}

    return false;
  }, [text]);

  const createCodeGroup = useCallback(
    () =>
      validGroup
        ? createGroup({
            ...validGroup,
            id: `shared-${validGroup.id}`,
          })
        : null,
    [validGroup]
  );

  const pushToRoute = useCallback(
    (id: string) => {
      setTimeout(() => {
        push(appendUrlPath(`/groups/${id}`));
      });
    },
    [push]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            "w-full h-full py-6 bg-card hover:bg-background border border-foreground"
          }
          aria-label={"Import group by code button"}
        >
          <ImportIcon className={"!w-8 !h-8 text-active"} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn("rounded-2xl", validGroup && "!border-green-500")}
      >
        <DialogHeader>
          <DialogTitle className={"font-light text-2xl"}>
            Group code
          </DialogTitle>
          <DialogDescription className={"text-lg text-gray-200"}>
            Copy and paste here the group code you want to import
          </DialogDescription>
        </DialogHeader>
        <Textarea
          className={cn(
            "overflow-y-auto h-[25vh] max-h-[40vh] bg-gradient-one border text-ms p-4 rounded overflow-x-auto whitespace-pre-wrap break-words",
            validGroup ? "!border-green-500" : "!border-red-400"
          )}
          placeholder="Paste your code here..."
          onChange={(e) => setText((e.target as any).value)}
          value={text}
        />

        <DialogFooter>
          <Button
            className={cn("w-full", validGroup && "bg-green-500")}
            disabled={!validGroup}
            onClick={() => {
              pushToRoute(createCodeGroup()!.id);
              setOpen(false);
            }}
          >
            CREATE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
