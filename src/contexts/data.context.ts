import { CardBaseType } from "@/models/card.model";
import { GroupType } from "@/models/group.model";
import { createContext } from "preact";

export type DataContextType = {
  /**
   * Get all cards
   */
  cards: CardBaseType[];

  /**
   * Get default groups
   */
  groups: GroupType[];
};

export const DataContext = createContext<DataContextType>({
  cards: [],
  groups: [],
});
