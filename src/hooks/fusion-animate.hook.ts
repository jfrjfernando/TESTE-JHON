import { GET_CARD_ELEMENT } from "@/components/molecules/CardAssembler";
import { CardBaseType } from "@/models/card.model";
import { useCallback } from "preact/hooks";

export function useFusionAnimate() {
  const animate = useCallback(
    (
      source: CardBaseType & { index: number },
      target: CardBaseType & { index: number },
      otherCards: (CardBaseType & { index: number })[],
      success: boolean,
      showCard: () => void,
      firstAnimation: boolean
    ): Promise<HTMLElement[]> => {
      return new Promise((resolve, reject) => {
        const cardSource = document.getElementById(
          GET_CARD_ELEMENT(source.id, source.index)
        );

        const cardTarget = document.getElementById(
          GET_CARD_ELEMENT(target.id, target.index)
        );

        if (!cardSource || !cardTarget) {
          console.error("Elements have not found!");

          reject("Error!");
          return;
        }

        // Start
        const otherCardsElement = otherCards.map((each) =>
          document.getElementById(GET_CARD_ELEMENT(each.id, each.index))
        );

        function end() {
          otherCardsElement.forEach((each) => {
            each!.style.filter = "";
          });

          cardSource!.style.animation = "";
          cardTarget!.style.animation = "";
          cardSource!.style.boxShadow = "";
          cardTarget!.style.boxShadow = "";

          resolve([cardSource!, cardTarget!]);
        }

        otherCardsElement.forEach((each) => {
          each!.style.filter = "brightness(0.5)";
        });

        cardSource.style.animation = "cardFusionShadowChange 1.5s infinite";
        cardTarget.style.animation = "cardFusionShadowChange 1.5s infinite";

        let counter = 0;

        function startAnimation() {
          if (counter < 80) {
            counter += 1;
            requestAnimationFrame(startAnimation);
          } else {
            cardSource!.style.animation = "";
            cardTarget!.style.animation = "";

            if (success) {
              positiveAnimation();
            } else {
              negativeAnimation();
            }
          }
        }

        let progression = 0;

        function positiveAnimation() {
          if (progression < 260) {
            progression += 3;

            cardSource!.style.boxShadow = "0 0 10px 5px green";
            cardTarget!.style.boxShadow = "0 0 10px 5px green";

            requestAnimationFrame(positiveAnimation);
          } else {
            delayShowCardAnimation();
          }
        }

        function negativeAnimation() {
          if (progression < 220) {
            progression += 3;

            cardSource!.style.filter = `sepia(${progression / 100})`;
            cardTarget!.style.filter = `sepia(${progression / 100})`;

            cardSource!.style.boxShadow = "0 0 10px 5px red";
            cardTarget!.style.boxShadow = "0 0 10px 5px red";

            requestAnimationFrame(negativeAnimation);
          } else {
            delayShowCardAnimation();
          }
        }

        let delay = 0;

        function delayShowCardAnimation() {
          if (delay < 40) {
            delay += 1;

            requestAnimationFrame(negativeAnimation);
          } else {
            showCard();
            vanishCardsAnimation();
          }
        }

        let opacity = 100;

        function vanishCardsAnimation() {
          if (opacity > 0) {
            opacity -= 6;

            if (firstAnimation) {
              cardSource!.style.opacity = `${opacity}%`;
            }

            cardTarget!.style.opacity = `${opacity}%`;

            requestAnimationFrame(vanishCardsAnimation);
          } else {
            cardSource!.style.filter = ``;
            cardTarget!.style.filter = ``;

            end();
          }
        }

        startAnimation();
      });
    },
    []
  );

  /**
   * A method for restore cards
   */
  const clearCards = useCallback((...elements: HTMLElement[]) => {
    elements.forEach((each) => {
      each.style.opacity = "";
      each.style.animation = "";
    });
  }, []);

  return { animate, clearCards };
}
