import { Trash } from "lucide-react";
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
import { deleteGroup } from "@/services/group";
import { useState } from "preact/hooks";

export function GroupDeleteButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} aria-label={"Remove group"}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={"mb-4"}>
          <DialogTitle className={"font-light text-3xl"}>
            Are you sure?
          </DialogTitle>
          <DialogDescription className={"font-light text-lg text-gray-200"}>
            This action cannot be undone. This will permanently delete your
            group "{name}".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"secondary"}
            onClick={() => setOpen(false)}
            className={"w-full"}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => deleteGroup(id)}
            className={"w-full"}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
