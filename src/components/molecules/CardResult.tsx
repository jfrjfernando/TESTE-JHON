import { useFusion } from "@/hooks/fusion.hook";
import { Card } from "./Card";
import { CardUnknown } from "../atoms/CardUnknown";

export function CardResult() {
  const { queueFusions, index } = useFusion();

  if (index === -1) {
    return <CardUnknown />;
  }

  const result = queueFusions[index].result;

  return <Card {...result} index={-1}></Card>;
}
