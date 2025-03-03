import { DynamicHead } from "../molecules/Helmet";
import { Simulator } from "../templates/Simulator";

export function SimulatorPage() {
  return (
    <>
      <DynamicHead
        titlePrefix={"Simulator"}
        description={"See all cards in your pool"}
        keywords={"pool, cards, total, all, groups"}
      />
      <main className={"!p-0"}>
        <Simulator />
      </main>
    </>
  );
}
