import { cn } from "@/lib/utils";
import { appendUrlPath } from "@/utils/path";

export function Logo({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <div
      style={{
        height: `${size * 0.3}px!important`,
        width: `${size}px`,
        transform: "translate(0, 5%)",
      }}
      class={cn("hover:animate-pulse max-[200px]:hidden", className)}
    >
      <a href={appendUrlPath("/")} aria-label="Home button">
        <img
          src={appendUrlPath("/images/logo.webp")}
          width={size * 1.35}
          alt={"App logo"}
          style={{
            objectFit: "cover",
          }}
          class="max-sm:w-full z-20"
        />
      </a>
    </div>
  );
}
