import { FusionResponse } from "@/services/fusion";
import { createContext } from "preact";
import { Dispatch, StateUpdater } from "preact/hooks";

export type FusionContextType = {
  /**
   * In fusing animation
   */
  fusing: boolean;

  /**
   * All fusions responses
   */
  queueFusions: FusionResponse[];

  /**
   * The current fusion of the responses, default: -1
   */
  index: number;

  /**
   * Set current fusion index
   */
  setIndex: Dispatch<StateUpdater<number>>;

  /**
   * Start the fusion (freeze)
   */
  setFusing: Dispatch<StateUpdater<boolean>>;

  /**
   * Set queue of fusions
   */
  setQueueFusions: Dispatch<StateUpdater<FusionResponse[]>>;

  /**
   * Reset to initial state
   */
  reset: () => void;
};

export const FusionContext = createContext<FusionContextType>({
  fusing: false,
  queueFusions: [],
  index: -1,
  setIndex: () => {},
  setFusing: () => {},
  setQueueFusions: () => {},
  reset: () => {},
});
