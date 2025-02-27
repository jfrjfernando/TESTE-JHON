import { ButtonHTMLAttributes } from "preact/compat";
import { Button } from "./Button";
import { Home } from "lucide-react";
import { appendUrlPath } from "@/utils/path";

export function BackButton(props: ButtonHTMLAttributes) {
  return (
    <a href={appendUrlPath("/")} className={"flex"}>
      <Button class={"w-min"} {...props}>
        <Home />
      </Button>
    </a>
  );
}
