import { useCallback, useMemo, useState } from "preact/hooks";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit3, Trash } from "lucide-react";
import {
  addGroupCards,
  deleteGroup,
  removeGroupCards,
  updateGroup,
} from "@/services/group";
import { GroupType } from "@/models/group.model";
import { findCardById, findCardByName } from "@/services/finder";
import { IdType } from "@/models/card.model";
import { MiniCard } from "../molecules/MiniCard";
import { Switch } from "../atoms/Switch";
import { selectGroups, unselectGroups } from "@/services/pool";
import { useStorage } from "@/hooks/storage.hook";
import { useRouter } from "preact-router";
import { AddCardButton } from "../molecules/AddCardButton";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export function GroupFull({
  group,
}: {
  group: GroupType & {
    editable?: boolean;
  };
}) {
  const { id, name, cards, editable } = group;

  const [edit, setEdit] = useState(false);
  const allCards = useMemo(
    () => cards.map((id) => findCardById(id as IdType)!),
    [cards]
  );

  const {
    simulator: { groups },
  } = useStorage();

  const selected = useMemo(
    () => groups.some((each) => each.id === id),
    [groups]
  );

  const [, push] = useRouter();

  const select = useCallback(() => {
    selectGroups(group);

    const element = document.getElementById("groups-section");
    if (element) {
      push("?page=1");
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [push, selectGroups, id]);

  const [newName, setNewName] = useState<string>(group.name);

  return (
    <UICard className={selected ? "bg-card border-amber-200" : "bg-background"}>
      <CardHeader>
        <CardTitle
          className={
            "relative flex items-center gap-4 border-b-2 pb-4 animate-in animate-bounce font-light"
          }
        >
          {edit ? (
            <Input
              defaultValue={name}
              onChange={(event) => setNewName((event.target as any)?.value!)}
              className={"w-fit"}
            />
          ) : (
            <p className={"text-xl uppercase"}>
              {name} ({allCards.length})
            </p>
          )}
          {editable && (
            <div className={"flex gap-1"}>
              <Button
                variant={"outline"}
                aria-label={"Edit name"}
                className={cn(
                  edit &&
                    ((newName?.length ?? 0) > 0 ? "bg-green-800" : "bg-red-800")
                )}
                disabled={(newName?.length ?? 0) <= 0}
                onClick={() => {
                  if (edit) {
                    updateGroup({
                      id,
                      name: newName ?? group.name,
                    });
                    setEdit(false);
                  } else {
                    setEdit(true);
                  }
                }}
              >
                <Edit3 />
              </Button>
              <Button
                variant={"outline"}
                onClick={() => deleteGroup(id)}
                aria-label={"Remove group"}
              >
                <Trash />
              </Button>
            </div>
          )}
          <div
            class={"absolute"}
            style={{
              left: "100%",
              transform: "translate(-100%,-100%)",
              top: "50%",
            }}
          >
            <Switch
              checked={selected}
              setChecked={() => (selected ? unselectGroups(group) : select())}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-wrap gap-2 w-fit"}>
        {allCards.map((each, index) => {
          const element = <MiniCard key={`${each}-${index}`} {...each} />;

          if (editable) {
            return (
              <HoverCard openDelay={300}>
                <HoverCardTrigger>
                  <div>{element}</div>
                </HoverCardTrigger>
                <HoverCardContent className={"w-fit bg-card"}>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      removeGroupCards(group.id, each);
                    }}
                  >
                    <Trash />
                  </Button>
                </HoverCardContent>
              </HoverCard>
            );
          }

          return element;
        })}
        {editable ? (
          <AddCardButton
            onAdd={(name) => {
              const card = findCardByName(name);

              if (!card) {
                return;
              }

              addGroupCards(group.id, card);
            }}
          />
        ) : (
          <></>
        )}
      </CardContent>
    </UICard>
  );
}
