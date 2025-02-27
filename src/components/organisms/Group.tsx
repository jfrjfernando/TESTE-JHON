import { useCallback, useMemo, useState } from "preact/hooks";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit3, Trash } from "lucide-react";
import { deleteGroup, updateGroup } from "@/services/group";
import { GroupType } from "@/models/group.model";
import { findCardById } from "@/services/finder";
import { IdType } from "@/models/card.model";
import { MiniCard } from "../molecules/MiniCard";
import { Switch } from "../atoms/Switch";
import { selectGroups, unselectGroups } from "@/services/pool";
import { useStorage } from "@/hooks/storage.hook";
import { useRouter } from "preact-router";

export function Group({
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [push, selectGroups, id]);

  return (
    <UICard>
      <CardHeader>
        <CardTitle
          className={
            "relative flex items-center gap-4 border-b-2 pb-4 animate-in animate-bounce font-light"
          }
        >
          {edit ? (
            <Input
              defaultValue={name}
              onChange={(event) =>
                updateGroup({
                  id,
                  name: (event.target as any)?.value!,
                })
              }
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
                onClick={() => setEdit(!edit)}
                aria-label={"Edit name"}
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
        {allCards.map((each, index) => (
          <MiniCard key={`${each}-${index}`} {...each} />
        ))}
      </CardContent>
    </UICard>
  );
}
