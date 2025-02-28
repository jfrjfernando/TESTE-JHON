import { appendUrlPath } from "@/utils/path";
import { Logo } from "../atoms/Logo";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../atoms/Button";
import { useRouter } from "preact-router";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes } from "preact/compat";
import { GithubIcon } from "lucide-react";
import { padToThreeDigits } from "@/utils/strings";
import ALL_CARDS from "@/models/data/cards";

export function NavigationBar() {
  const [{ url }] = useRouter();

  if (url.includes("simulator")) {
    return;
  }

  return (
    <header
      className={"w-full max-w-[940px] m-auto h-[70px] mt-4 shadow-xl mb-12"}
    >
      <nav className={"w-full h-full relative"}>
        <span
          className={
            "-z-10 w-full h-full bg-gradient-to-b from-violet-600 to-purple-900 absolute"
          }
          style={{
            "clip-path": "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
            boxShadow: "inset 5px -2px 16px 0px rgba(162, 0, 255, 0.5)",
          }}
        />
        <div class={"flex justify-between items-center h-full ml-10 mr-20"}>
          <Logo size={128} />
          <SearchBar />
          <a href={appendUrlPath("/simulator")}>
            <Button
              path={appendUrlPath("/simulator")}
              className={"py-1 px-3 text-xl"}
            >
              PLAY
            </Button>
          </a>
        </div>
        <div class={"flex items-center justify-center gap-6 text-xl"}>
          <Link path={appendUrlPath("/")} text="home" />
          <Link path={appendUrlPath("/pool")} text="pool" />
          <Link path={appendUrlPath("/simulator")} text="simulator" />
          <Link
            path={appendUrlPath(
              `/cards/${padToThreeDigits(
                Math.floor(Math.random() * ALL_CARDS.length) + 1
              )}`
            )}
            text="random card"
          />
          <Link
            path="https://github.com/lukadevv/fusion-simulator/"
            text="github"
            icon={<GithubIcon size={"18px"} />}
            target={"_blank"}
          />
        </div>
      </nav>
    </header>
  );
}

function Link({
  selected,
  path,
  text,
  target,
  icon,
}: {
  selected?: boolean;
  path: string;
  text: string;
  target?: AnchorHTMLAttributes["target"];
  icon?: React.ReactElement;
}) {
  const [{ url }] = useRouter();

  return (
    <a
      className={cn(
        "hover:text-orange-300 uppercase transition-all duration-150 hover:underline",
        (selected || path.length === 1 ? url === path : url.includes(path)) &&
          "text-orange-300",
        icon && "flex gap-0.5 items-center"
      )}
      href={path}
      role={"link"}
      target={target}
      rel={target ? "noopener" : undefined}
    >
      {icon}
      {text}
    </a>
  );
}
