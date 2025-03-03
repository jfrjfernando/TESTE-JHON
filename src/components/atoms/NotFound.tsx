import { appendUrlPath } from "@/utils/path";
import { Button } from "./Button";
import { DynamicHead } from "../molecules/Helmet";

export function NotFound() {
  return (
    <>
      <DynamicHead
        titlePrefix={`404 Not Found`}
        description="Route was not found!"
        keywords="404, not found"
      />
      <section className={"flex flex-col justify-center items-center"}>
        <p className={"text-8xl text-red-800"}>404</p>
        <p className={"text-4xl text-red-300"}>Page Not Found</p>
        <a href={appendUrlPath("/")}>
          <Button className={"mt-4 px-8"}>HOME</Button>
        </a>
      </section>
    </>
  );
}
