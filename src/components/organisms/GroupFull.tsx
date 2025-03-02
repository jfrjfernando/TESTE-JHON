import { useCallback, useMemo, useState } from "preact/hooks";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Download, Edit3, Trash } from "lucide-react";
import { addGroupCards, removeGroupCards, updateGroup } from "@/services/group";
import { GroupType } from "@/models/group.model";
import { IdType } from "@/models/card.model";
import { MiniCard } from "../molecules/MiniCard";
import { Switch } from "../atoms/Switch";
import { selectGroups, unselectGroups } from "@/services/pool";
import { useStorage } from "@/hooks/storage.hook";
import { useRouter } from "preact-router";
import { AddCardButton } from "../molecules/AddCardButton";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { GroupExportButton } from "../atoms/GroupExportButton";
import { GroupDeleteButton } from "../atoms/GroupDeleteButton";
import { useCards } from "@/hooks/cards.hook";

export function GroupFull({
  group,
}: {
  group: GroupType & {
    editable?: boolean;
  };
}) {
  const { id, name, cards, editable } = group;
  const { findCardById, findCardByName } = useCards();

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

  const findCard = useCallback((name: string) => findCardByName(name), []);

  return (
    <UICard
      className={
        selected ? "bg-card border-active box-shadow-accent" : "bg-background"
      }
    >
      <CardHeader>
        <CardTitle
          className={cn(
            "relative flex items-center gap-4 border-b-2 pb-4 animate-in animate-bounce font-light max-[435px]:flex-col",
            selected && "border-active"
          )}
        >
          {edit ? (
            <Input
              defaultValue={name}
              onChange={(event) => setNewName((event.target as any)?.value!)}
              className={"w-fit"}
            />
          ) : (
            <p className={"text-xl uppercase transition-all"}>
              {name} ({allCards.length})
            </p>
          )}
          {editable && (
            <div className={"flex gap-1"}>
              <Button
                variant={"outline"}
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
                aria-label={"Edit name"}
                className={cn(
                  edit &&
                    ((newName?.length ?? 0) > 0 ? "bg-green-800" : "bg-red-800")
                )}
                disabled={(newName?.length ?? 0) <= 0}
              >
                <Edit3 />
              </Button>
              <GroupExportButton group={group}>
                <Button variant={"outline"} aria-label={"Export group"}>
                  <Download />
                </Button>
              </GroupExportButton>
              <GroupDeleteButton {...group} />
            </div>
          )}
          <div
            className={
              "absolute transform max-[331px]:translate-x-[100%] max-[331px]:static max-[331px]:translate-y-[120%]"
            }
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
      <CardContent
        className={
          "grid grid-cols-11 gap-2 max-[1040px]:grid-cols-10 max-[970px]:grid-cols-9 max-[785px]:grid-cols-8 max-[700px]:grid-cols-7 max-[615px]:grid-cols-6 max-[530px]:grid-cols-5 max-[451px]:grid-cols-4 max-[380px]:grid-cols-3 max-[305px]:grid-cols-2 max-[234px]:grid-cols-1 m-auto"
        }
      >
        {allCards.map((each, index) => {
          const element = <MiniCard key={`${each}-${index}`} {...each} />;

          if (editable) {
            return (
              <ContextMenu>
                <ContextMenuTrigger>{element}</ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    className={"flex gap-2 items-center cursor-pointer"}
                    onClick={() => removeGroupCards(id, each)}
                  >
                    <Trash />
                    <p>Remove</p>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          }

          return element;
        })}
        {editable ? (
          <AddCardButton
            onAdd={(name) => {
              const card = findCard(name);

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
