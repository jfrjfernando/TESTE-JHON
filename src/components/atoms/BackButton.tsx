import { ButtonHTMLAttributes } from "preact/compat";
import { Button } from "./Button";
import { Home } from "lucide-react";
import { appendUrlPath } from "@/utils/path";

export function BackButton({ ...props }: ButtonHTMLAttributes) {
  return (
    <a href={appendUrlPath("/")}>
      <Button aria-label={"Back button"} {...props}>
        <Home />
      </Button>
    </a>
  );
}
