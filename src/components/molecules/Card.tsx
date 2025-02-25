import { CardBaseType, CardType } from "@/models/card.model";
import { CardAssembler, CardAssemblerProps } from "./CardAssembler";

export function Card(
  card: CardBaseType &
    Pick<
      CardAssemblerProps,
      "focus" | "onClick" | "onHover" | "priority" | "index" | "id" | "props"
    >
) {
  if (card.cardType === CardType.MONSTER) {
    return <CardAssembler frame="monster" {...card} />;
  }

  return <CardAssembler frame="equip" {...card} />;
}
