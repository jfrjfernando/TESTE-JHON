import { GroupAddButton } from "../atoms/GroupAddButton";
import { GroupImportButton } from "../atoms/GroupImportButton";
import { Pool } from "../molecules/Pool";
import { Groups } from "../templates/Groups";

export function HomePage() {
  return (
    <main className={"!max-w-[960px]"}>
      <div className={"flex flex-col gap-6"}>
        <Pool />
        <div className={"flex justify-center items-center gap-4"}>
          <GroupImportButton />
          <GroupAddButton />
        </div>
        <Groups />
      </div>
    </main>
  );
}
