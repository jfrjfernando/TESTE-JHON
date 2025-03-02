import { CardMonsterType, CardType } from "@/models/card.model";
import { useSimulator } from "@/hooks/simulator.hook";
import { LongNumber } from "../molecules/LongNumber";
import { appendAssetsAPIPath } from "@/utils/path";
import { FuseButton } from "../atoms/FuseButton";
import { ResetButton } from "../atoms/ResetButton";
import { PoolButton } from "../atoms/PoolButton";
import { useFusion } from "@/hooks/fusion.hook";
import { CardResult } from "../atoms/CardResult";
import { CardStatsButton } from "../atoms/CardStatsButton";
import { BackButton } from "../atoms/BackButton";
import { Card } from "../molecules/Card";
import { SpeedButton } from "../atoms/SpeedButton";
import { FusionResults } from "../atoms/FusionResults";

export function HandTable() {
  const { focusCardIndex, focusCard, setFocusCard, hand, selectHandCard } =
    useSimulator();

  const { fusing } = useFusion();

  return (
    <div class={"h-[100vh] flex flex-col pixelated-font"}>
      <div
        class={
          "z-10 flex flex-col gap-4 justify-center py-2 px-4 max-[424px]:py-0"
        }
        style={{
          background: `url(${appendAssetsAPIPath(
            "/images/assets/border_top.webp"
          )})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          imageRendering: "pixelated",
        }}
      >
        <div
          className={"flex justify-between items-center max-[424px]:flex-col"}
        >
          <div
            class={"flex gap-4 max-[424px]:justify-between max-[424px]:w-full"}
          >
            <BackButton className={"w-min max-[718px]:px-3 max-[718px]:h-13"} />
            <PoolButton
              className={
                "w-min max-[718px]:px-3 max-[718px]:h-13 max-[718px]:text-2xl py-0.5"
              }
            />
            <SpeedButton
              className={"w-min max-[718px]:px-3 max-[718px]:h-13"}
              iconClassName={"size-8"}
            />
          </div>
          <div
            class={"flex gap-4 max-[424px]:justify-evenly max-[424px]:w-full"}
          >
            <CardStatsButton
              className={
                "w-min max-[718px]:px-3 max-[718px]:h-13 max-[718px]:text-2xl py-0.5"
              }
            />
            <ResetButton
              className={
                "w-min max-[718px]:px-3 max-[718px]:h-13 max-[718px]:text-2xl py-0.5"
              }
            />
          </div>
        </div>
      </div>
      <div
        className={"z-10 flex flex-col justify-between h-full items-center"}
        style={{
          background: `url(${appendAssetsAPIPath(
            "/images/assets/background.webp"
          )})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          imageRendering: "pixelated",
        }}
      >
        {fusing && (
          <div
            className={
              "-z-0 absolute w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 bg-black opacity-50"
            }
          />
        )}
        <div class={"relative flex flex-col gap-4 justify-end h-full pb-2"}>
          <div class={"flex flex-col gap-6 justify-center items-center mb-2"}>
            <CardResult />
            <FusionResults />
          </div>
        </div>
        <FuseButton />

        {/* Hand table */}
        <div
          class={
            "w-full m-auto flex flex-col content-end justify-end table-cards-scroll"
          }
        >
          <div
            className={
              "relative max-[639px]:pb-8 max-[639px]:overflow-x-scroll scroll max-[639px]:w-full max-[639px]:overflow-y-hidden max-[639px]:m-auto"
            }
          >
            <div
              className={
                "max-[639px]:w-fit flex gap-9 max-[790px]:gap-5 max-[695px]:gap-2 justify-center -translate-y-2 min-[770px]:translate-y-12 min-[450px]:translate-y-6 max-[450px]:translate-y-7"
              }
            >
              {hand.map((each, index) => (
                <Card
                  key={`${each.id}-${index}`}
                  index={index}
                  {...each}
                  focus={index === focusCardIndex}
                  onClick={() => selectHandCard()}
                  onHover={() => setFocusCard(index)}
                />
              ))}
            </div>
          </div>

          <div className={"bg-[#080106] w-full"}>
            <div className={"select-none pointer-events-none"}>
              <img
                className={""}
                src={appendAssetsAPIPath("/images/assets/border_top.webp")}
                width={"100%"}
                style={{
                  imageRendering: "pixelated",
                }}
              />
              <article className={"mx-4 pt-1"}>
                {!fusing && focusCard ? (
                  <div class={"flex flex-col gap-1"}>
                    <div className={"flex justify-between"}>
                      <div class={"flex gap-2 overflow-hidden"}>
                        <p
                          className={"text-3xl text-red-300 max-[341px]:hidden"}
                        >
                          {focusCard.id}
                        </p>
                        <p className={"text-3xl text-slate-300 text-nowrap"}>
                          {focusCard.name}
                        </p>
                      </div>
                      <div className={"flex gap-1"}>
                        {focusCard.cardType === CardType.MONSTER ? (
                          <>
                            <div
                              className={
                                "flex flex-col gap-1 max-[460px]:hidden"
                              }
                            >
                              <div className={"flex gap-2"}>
                                <img
                                  src={appendAssetsAPIPath(
                                    "/images/assets/sword.webp"
                                  )}
                                  alt={"Attack icon"}
                                  width={"18px"}
                                  height={"18px"}
                                  style={{
                                    imageRendering: "pixelated",
                                  }}
                                />
                                <LongNumber
                                  hiddenNumbers
                                  numbers={
                                    (focusCard as CardMonsterType).attack
                                  }
                                  width={18}
                                  height={18}
                                />
                              </div>
                              <div className={"flex gap-2"}>
                                <img
                                  src={appendAssetsAPIPath(
                                    "/images/assets/shield.webp"
                                  )}
                                  alt={"Defense icon"}
                                  width={"18px"}
                                  height={"18px"}
                                  style={{
                                    imageRendering: "pixelated",
                                  }}
                                />
                                <LongNumber
                                  hiddenNumbers
                                  numbers={
                                    (focusCard as CardMonsterType).defense
                                  }
                                  width={18}
                                  height={18}
                                />
                              </div>
                            </div>
                            <div
                              className={
                                "flex w-full h-full items-center justify-end gap-2"
                              }
                            >
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
                                className={"max-[365px]:hidden"}
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
                                className={"max-[365px]:hidden"}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={
                                "flex w-full h-full items-center justify-end gap-2"
                              }
                            >
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
                              <p className={"text-4xl text-gray-400"}>
                                {focusCard.cardType}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={"h-[39.99px]"}></div>
                )}
              </article>
              <img
                src={appendAssetsAPIPath("/images/assets/border_bottom.webp")}
                width={"100%"}
                style={{
                  imageRendering: "pixelated",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
