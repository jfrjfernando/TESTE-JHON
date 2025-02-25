import { CardBaseType, CardMonsterType } from "../card.model";
import ALL_CARDS_ONE from "./parts/cards.one";
import ALL_CARDS_TWO from "./parts/cards.two";
import ALL_CARDS_THREE from "./parts/cards.three";

const ALL_CARDS = [
  ...ALL_CARDS_ONE,
  ...ALL_CARDS_TWO,
  ...ALL_CARDS_THREE,
] satisfies (CardBaseType | CardMonsterType)[];

// Clear arrays

ALL_CARDS_ONE.splice(0, ALL_CARDS_ONE.length);
ALL_CARDS_TWO.splice(0, ALL_CARDS_TWO.length);
ALL_CARDS_THREE.splice(0, ALL_CARDS_THREE.length);

export default ALL_CARDS;
