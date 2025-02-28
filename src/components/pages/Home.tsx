import { GroupAddButton } from "../atoms/GroupAddButton";
import { Pool } from "../molecules/Pool";
import { Groups } from "../templates/Groups";

export function HomePage() {
  return (
    <main className={"!max-w-[960px]"}>
      <div className={"flex flex-col gap-6"}>
        <Pool />
        <GroupAddButton />
        <Groups />
      </div>
    </main>
  );
}
