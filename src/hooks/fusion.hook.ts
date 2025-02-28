import { FusionContext } from "@/contexts/fusion.context";
import { generateQueueFusions } from "@/services/fusion";
import { useCallback, useContext } from "preact/hooks";
import { useSimulator } from "./simulator.hook";
import { useFusionAnimate } from "./fusion-animate.hook";

export function useFusion() {
  const {
    fusing,
    index,
    queueFusions,
    setFusing,
    setIndex,
    setQueueFusions,
    reset,
  } = useContext(FusionContext);

  const { animate, moveOutUsedCards, clearCards } = useFusionAnimate();

  const { queueCards, hand, init } = useSimulator();

  const startFusion = useCallback(() => {
    if (queueCards.length < 2) {
      console.error("At least two cards are needed for fusing");

      return;
    }

    // Set queue of fusions
    const queue = generateQueueFusions(queueCards);
    setQueueFusions(queue);

    // Turn on fusing animation.
    setFusing(true);

    const fuseButton = document.getElementById("fuse-button");

    fuseButton!.style.opacity = "0";

    (async () => {
      // Set the first card as source
      let queueCardsIndex = 0;
      let source = queueCards[queueCardsIndex++];

      const cardsElements: HTMLElement[] = [];

      for (let i = 0; i < queue.length; i++) {
        const response = queue[i];
        let target = queueCards[queueCardsIndex++];

        moveOutUsedCards(
          hand
            .map((each, index) => ({
              ...each,
              index,
            }))
            .filter((each) => !each.priority)
        );

        cardsElements.push(
          ...(await animate(
            source,
            target,
            hand
              .map((each, index) => ({
                ...each,
                index,
              }))
              .filter(
                (each, index) =>
                  source.id !== each.id &&
                  source.index !== index &&
                  target.id !== each.id &&
                  target.index !== index
              ),
            response.success,
            () => {
              setIndex(i);
            },
            i === 0
          ))
        );

        source = {
          ...response.result,
          // TODO: Check this index, maybe this can cause a conflict
          index: -1,
        };
      }

      await new Promise((resolve) => setTimeout(resolve, 2200));

      clearCards(...cardsElements);

      reset();

      init();

      fuseButton!.style.opacity = "100%";
    })();
  }, [setFusing, setQueueFusions, setIndex, queueCards, hand]);

  return {
    fusing,
    index,
    queueFusions,
    startFusion,
    setFusing,
  };
}
