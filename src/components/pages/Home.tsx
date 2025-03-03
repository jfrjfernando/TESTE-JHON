import { GroupAddButton } from "../atoms/GroupAddButton";
import { GroupImportButton } from "../atoms/GroupImportButton";
import { DynamicHead } from "../molecules/Helmet";
import { Pool } from "../molecules/Pool";
import { Groups } from "../templates/Groups";

export function HomePage() {
  return (
    <>
      <DynamicHead
        titlePrefix="Home"
        description="Manage your groups and pool cards"
        keywords="main,management,groups,pool,cards,home"
      />
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
    </>
  );
}
