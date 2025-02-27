import { useFusion } from "@/hooks/fusion.hook";
import { CardUnknown } from "../atoms/CardUnknown";
import { Card } from "./Card";

export function CardResult() {
  const { queueFusions, index } = useFusion();

  if (index === -1) {
    return <CardUnknown />;
  }

  const result = queueFusions[index].result;

  return <Card {...result} index={-1}></Card>;
}
