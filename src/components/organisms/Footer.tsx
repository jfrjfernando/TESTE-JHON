import { useRouter } from "preact-router";
import { Logo } from "../atoms/Logo";
import { ButtonAnchor } from "../ui/button_anchor";
import { Button } from "../ui/button";
import { appendUrlPath } from "@/utils/path";

export function Footer() {
  const [{ url }] = useRouter();

  if (url.includes("simulator")) {
    return;
  }

  return (
    <footer class="mt-10 max-w-[960px] m-auto mb-4 px-4">
      <section class="bg-gradient-two border-2 p-4 rounded-4xl my-4">
        <div class="grid mb-2 gap-4 grid-cols-4 max-[497px]:grid-cols-2 max-[270px]:grid-cols-1">
          <div class="h-48 m-auto">
            <Logo size={"md"} />
          </div>
          <FooterColumn
            title="Links"
            content={[
              {
                text: "Home",
                href: appendUrlPath("/"),
              },
              {
                text: "Simulator",
                href: appendUrlPath("/simulator"),
              },
              {
                text: "GitHub",
                href: "https://github.com/lukadevv/fusion-simulator/",
              },
            ]}
          />
          <FooterColumn
            title="Simulator"
            content={[
              {
                text: "Play",
                href: appendUrlPath("/simulator"),
              },
              {
                text: "Pool",
                href: appendUrlPath("/pool"),
              },
            ]}
          />
          <FooterColumn
            title="Contact"
            content={[
              {
                text: "GitHub",
                href: "https://lukadevv.github.io",
              },
            ]}
          />
        </div>
      </section>
      <div class="w-full flex justify-between items-center bg-card rounded-xl px-4">
        <p class="text-sm text-slate-300 m-auto py-1">
          © 2025{" "}
          <a
            className={"hover:text-active"}
            href={"https://github.com/lukadevv/fusion-simulator/"}
          >
            lukkadev
          </a>
          . Licensed under the{" "}
          <a
            className={"hover:text-active"}
            href={
              "https://raw.githubusercontent.com/lukadevv/fusion-simulator/refs/heads/main/LICENSE"
            }
          >
            GNU General Public License v3.0
          </a>
          .
        </p>
        {/* <div class="text-end">
          <Button variant="link" className="w-fit text-slate-300">
            Privacy Policy
          </Button>
          <Button variant="link" className="w-fit text-slate-300">
            Terms of Service
          </Button>
        </div> */}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  content,
}: {
  title: string;
  content: { text: string; href?: string }[];
}) {
  return (
    <div class="flex flex-col gap-1 border-l-1 max-[270px]:border-l-0 max-[270px]:border-t-1 max-[270px]:pt-2 border-background px-4 pl-6">
      <p class="mb-3 text-start text-slate-100 font-bold">{title}</p>
      {content.map(({ text, href }) =>
        href ? (
          <ButtonAnchor
            variant="link"
            href={href}
            className="w-fit text-slate-300"
          >
            {text}
          </ButtonAnchor>
        ) : (
          <Button variant="link" className="w-fit text-slate-300">
            {text}
          </Button>
        )
      )}
    </div>
  );
}
