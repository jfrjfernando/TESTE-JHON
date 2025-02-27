import { CardBaseType } from "@/models/card.model";
import { findCardById, findCardByName } from "@/services/finder";
import { useRouter } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { StatsContent } from "../atoms/CardStatsButton";
import { Dialog } from "../ui/dialog";
import { appendAssetsAPIPath } from "@/utils/path";

export function CardPage() {
  const [
    {
      // "id" could be an ID and a same
      matches: { id },
    },
  ] = useRouter() as any;

  const [card, setCard] = useState<CardBaseType>();

  useEffect(() => {
    let findCard = findCardById(id);

    if (!findCard) {
      findCard = findCardByName(id);
    }

    if (!findCard) {
      // Card not exists!
      return;
    }

    setCard(findCard);
  }, [id]);

  if (!card) {
    return <></>;
  }

  return (
    <main>
      <Dialog>
        <div
          style={{
            background: `url(${appendAssetsAPIPath(
              "/images/assets/background.webp"
            )})`,
            backgroundSize: "cover",
          }}
          className={"max-w-[1040px] m-auto px-2.5 py-2"}
        >
          <StatsContent
            focusCard={card}
            fusionsContainerProps={{
              className: "h-max mb-2 flex flex-wrap",
            }}
            height={800}
          />
        </div>
      </Dialog>
    </main>
  );
}
