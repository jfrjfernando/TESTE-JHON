import { useRouter } from "preact-router";
import { Skeleton } from "../ui/skeleton";

export function DataLoadingBody() {
  const [{ url }] = useRouter();

  if (url.includes("/simulator")) {
    return <></>;
  }

  return (
    <main className={"!max-w-[960px] flex flex-col gap-6"}>
      <Skeleton className="h-[427px] w-full rounded-xl bg-gradient-one opacity-45" />
      <div className={"flex gap-4"}>
        <Skeleton className="h-[81.79px] w-full rounded-xl bg-gradient-one opacity-45" />
        <Skeleton className="h-[81.79px] w-full rounded-xl bg-gradient-one opacity-45" />
      </div>
      <Skeleton className="h-[350px] w-full rounded-xl bg-gradient-one opacity-45" />
      <Skeleton className="h-[350px] w-full rounded-xl bg-gradient-one opacity-45" />
      <Skeleton className="h-[350px] w-full rounded-xl bg-gradient-one opacity-45" />
      <Skeleton className="h-[350px] w-full rounded-xl bg-gradient-one opacity-45" />
    </main>
  );
}
