import { useRouter } from "preact-router";
import { useMemo } from "preact/hooks";
import { Dialog } from "../ui/dialog";
import { appendAssetsAPIPath } from "@/utils/path";
import { NotFound } from "../atoms/NotFound";
import { CardStats } from "../organisms/CardStats";
import { useCards } from "@/hooks/cards.hook";
import { DynamicHead } from "../molecules/Helmet";
import { getURLFriendlyString } from "@/utils/strings";
import { IdType } from "@/models/card.model";

export function CardPage() {
  const [
    {
      // "id" could be an ID and a same
      matches: { id: rawId },
    },
  ] = useRouter() as any;

  const { findCardById, findCardByName } = useCards();

  const id = useMemo(() => getURLFriendlyString(rawId), [rawId]);

  const card = useMemo(() => {
    let findCard = findCardById(id as IdType);

    if (!findCard) {
      findCard = findCardByName(id);
    }

    if (!findCard) {
      // Card not exists!
      return null;
    }

    return findCard;
  }, [findCardById, id]);

  if (!card) {
    return <NotFound />;
  }

  return (
    <>
      <DynamicHead
        titlePrefix={`${card.id} ${card.name}`}
        description={card.description}
        keywords={`${card.name}, stats, all fusions, equips, recipe, ${card.id}`}
      />
      <main>
        <Dialog>
          <div
            style={{
              background: `url(${appendAssetsAPIPath(
                "/images/assets/background.webp"
              )})`,
              backgroundSize: "cover",
            }}
            className={
              "max-w-[1040px] m-auto px-2.5 py-2 rounded-lg box-shadow"
            }
          >
            <CardStats
              focusCard={card}
              fusionsContainerProps={{
                className: "h-max mb-2 flex flex-wrap",
              }}
              height={800}
            />
          </div>
        </Dialog>
      </main>
    </>
  );
}
