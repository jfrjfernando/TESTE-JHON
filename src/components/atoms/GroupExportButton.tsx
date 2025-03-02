import { GroupType } from "@/models/group.model";
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

export function GroupExportButton({
  children,
  group,
}: React.PropsWithChildren<{
  group: GroupType;
}>) {
  const [copied, setCopied] = useState<boolean>(false);
  const code = useMemo(
    () =>
      JSON.stringify({
        // Avoid paste metadata like "editable"
        id: group.id,
        cards: group.cards,
        name: group.name,
      } as GroupType),
    [group]
  );
  const copy = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        // Reset the copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }, [code]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={"rounded-2xl"}>
        <DialogHeader>
          <DialogTitle className={"font-light text-2xl"}>
            Group code
          </DialogTitle>
          <DialogDescription className={"text-lg text-gray-200"}>
            Share your group by copying the code and importing it using the
            import button at the group section in home page.
          </DialogDescription>
        </DialogHeader>
        <pre className="overflow-y-auto max-h-[40vh] bg-gradient-one border text-sm p-4 rounded overflow-x-auto whitespace-pre-wrap break-words">
          <code>{code}</code>
        </pre>
        <DialogFooter>
          <Button className={"w-full"} disabled={copied} onClick={() => copy()}>
            COPY
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
