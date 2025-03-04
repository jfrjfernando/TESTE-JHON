import { appendUrlPath } from "@/utils/path";
import { Logo } from "../atoms/Logo";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../atoms/Button";
import { useRouter } from "preact-router";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, useCallback } from "preact/compat";
import { GithubIcon } from "lucide-react";
import { padToThreeDigits, toURLFriendlyString } from "@/utils/strings";
import { useDataVolatile } from "@/hooks/data.hook";

export function NavigationBar() {
  const [{ url }, push] = useRouter();
  const { cards } = useDataVolatile();

  if (url.includes("simulator")) {
    return;
  }

  const openSimulatorNewWindow = useCallback(() => {
    window.open(
      appendUrlPath(`/simulator`),
      "simulator",
      `width=924,height=788,menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no,fullscreen=no`
    );
  }, []);

  return (
    <header
      className={
        "w-full max-w-[940px] m-auto px-2 h-[70px] mt-4 shadow-xl mb-18 max-[459px]:mb-28 max-[245px]:mb-40 max-[237px]:mb-52"
      }
    >
      <nav className={"w-full h-full relative"}>
        <span
          className={
            "-z-10 w-full h-full bg-gradient-one opacity-75 border-y border-b-active absolute"
          }
          style={{
            "clip-path": "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
            boxShadow: "rgb(0 0 0 / 82%) 5px -2px 16px 0px inset",
          }}
        />
        <div
          class={
            "flex justify-between items-center h-full ml-10 max-[523px]:mx-8 max-[250px]:mx-4 mr-20"
          }
        >
          <Logo
            size={128}
            className="max-[634px]:!w-[100px] max-[485px]:!w-[80px]"
          />
          <SearchBar
            cards={cards}
            onSelect={(cardName) => {
              push(appendUrlPath(`/cards/${toURLFriendlyString(cardName)}`));
            }}
          />
          <div className={"max-[336px]:hidden"}>
            <Button
              className={"py-1 px-3 text-xl"}
              onClick={() => openSimulatorNewWindow()}
            >
              PLAY
            </Button>
          </div>
        </div>
        <div
          class={
            "flex items-center justify-center gap-6 text-xl mt-2 flex-wrap mx-2"
          }
        >
          <Link path={appendUrlPath("/")} text="home" />
          <Link path={appendUrlPath("/pool")} text="pool" />
          <Link path={appendUrlPath("/simulator")} text="simulator" />
          <Link
            path={appendUrlPath(
              `/cards/${padToThreeDigits(
                Math.floor(Math.random() * (cards?.length ?? 1)) + 1
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
