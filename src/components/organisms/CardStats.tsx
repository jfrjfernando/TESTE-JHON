import { useSimulator } from "@/hooks/simulator.hook";
import { CardMonsterType, CardType } from "@/models/card.model";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { appendAssetsAPIPath } from "@/utils/path";
import { Card } from "../molecules/Card";
import { LongNumber } from "../molecules/LongNumber";
import { FusionsGrid } from "../molecules/FusionsGrid";
import { RecipeFusionsGrid } from "../molecules/RecipeFusionsGrid";

export function CardStats({
  focusCard,
  fusionsContainerProps,
  height,
}: {
  focusCard: NonNullable<ReturnType<typeof useSimulator>["focusCard"]>;
  fusionsContainerProps?: React.HTMLProps<HTMLDivElement>;
  height?: number;
}) {
  const { id, name, description, price, password, groups } = focusCard;

  const { level } = (focusCard as CardMonsterType) || {};

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {level && level > 1 ? (
            <div className={"flex gap-0.5 justify-center mb-2"}>
              {Array.from({ length: level }).map((_, index) => (
                <img
                  key={index}
                  src={appendAssetsAPIPath(`/images/assets/star.webp`)}
                  alt={"Type icon"}
                  width={"22px"}
                  height={"22px"}
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
              ))}
            </div>
          ) : (
            <div className={"h-[22px]"}></div>
          )}
          <div
            className={
              "flex gap-2 overflow-hidden font-light justify-between bg-[#080106] px-3 py-2 mt-2 rounded-[4px] shadow-lg shadow-gray-950"
            }
          >
            <p className={"text-3xl text-red-300"}>{id}</p>
            <p className={"text-3xl text-slate-300 text-nowrap"}>{name}</p>
            {focusCard.cardType === CardType.MONSTER ? (
              <img
                src={appendAssetsAPIPath(
                  `/images/types/${(
                    focusCard as CardMonsterType
                  ).type.toLowerCase()}.webp`
                )}
                alt={"Type icon"}
                width={"36px"}
                height={"36px"}
                style={{
                  imageRendering: "pixelated",
                }}
              />
            ) : (
              <img
                src={appendAssetsAPIPath(
                  focusCard.cardType === CardType.TRAP
                    ? "/images/types/fiend.webp"
                    : focusCard.cardType === CardType.FIELD
                    ? "/images/types/aqua.webp"
                    : focusCard.cardType === CardType.EQUIP
                    ? "/images/types/warrior.webp"
                    : focusCard.cardType === CardType.MAGIC
                    ? "/images/types/spellcaster.webp"
                    : focusCard.cardType === CardType.RITUAL
                    ? "/images/types/zombie.webp"
                    : "/images/types/spellcaster.webp"
                )}
                alt={"Type icon"}
                width={"36px"}
                height={"36px"}
                style={{
                  imageRendering: "pixelated",
                }}
              />
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
      <div
        className={
          "flex gap-4 mt-4 h-fit max-[420px]:flex-col max-[420px]:items-center max-[420px]:mb-4"
        }
      >
        <div className={"h-fit"}>
          <Card {...focusCard} index={-2} priority={undefined} focus={false} />
          <div className={"flex gap-1 justify-center mt-1 items-center"}>
            {focusCard.cardType === CardType.MONSTER ? (
              <>
                <img
                  src={appendAssetsAPIPath(
                    `/images/guardians/${(
                      focusCard as CardMonsterType
                    ).guardians[0].toLowerCase()}.webp`
                  )}
                  alt={"Guardian icon"}
                  width={"36px"}
                  height={"36px"}
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
                <img
                  src={appendAssetsAPIPath(
                    `/images/guardians/${(
                      focusCard as CardMonsterType
                    ).guardians[1].toLowerCase()}.webp`
                  )}
                  alt={"Guardian icon"}
                  width={"36px"}
                  height={"36px"}
                  style={{
                    imageRendering: "pixelated",
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={"h-fit w-full"}>
          <p
            className={
              "text-3xl text-white bg-[#080106] px-4 py-2 overflow-hidden h-36 mt-0.5 border-l-2 overflow-y-auto max-[600px]:text-xl"
            }
            style={{
              borderRadius: "4px",
            }}
          >
            {description}
          </p>
          <p className={"text-gray-300 text-lg text-center"}>
            {groups.map((each) => each).join(", ")}
          </p>
        </div>
      </div>
      {(!!focusCard.fusions?.length ||
        !!(focusCard as CardMonsterType)?.equips?.length) && (
        <FusionsGrid
          card={focusCard}
          fusions={focusCard.fusions ?? []}
          fusionsContainerProps={fusionsContainerProps}
          maxHeight={height}
          equips={(focusCard as CardMonsterType)?.equips ?? []}
          title={(length) => (
            <p className={"text-center text-3xl text-white"}>
              FUSIONS & EQUIPMENTS ({length})
            </p>
          )}
        />
      )}
      {(!!focusCard.fusions?.length ||
        !!(focusCard as CardMonsterType)?.equips?.length) && (
        <RecipeFusionsGrid
          card={focusCard}
          fusionsContainerProps={fusionsContainerProps}
          maxHeight={height}
          equips={(focusCard as CardMonsterType)?.equips ?? []}
        />
      )}
      <DialogFooter>
        {password && price && (
          <div className={"flex justify-between items-end w-full gap-3"}>
            <div>
              <LongNumber numbers={Number(price)} width={19} height={19} />
            </div>
            <div>
              <LongNumber numbers={Number(password)} width={19} height={19} />
            </div>
          </div>
        )}
      </DialogFooter>
    </>
  );
}
