import { cn } from "@/lib/utils";
import { appendUrlPath } from "@/utils/path";

export function Logo({
  size,
  className,
  highPriority,
}: {
  size: "md";
  className?: string;
  highPriority?: boolean;
}) {
  const sizePx = size === "md" ? 100 : 128;
  const filename = size === "md" ? "logo100x100.webp" : "logo.webp";

  return (
    <div
      style={{
        transform: "translate(0, 5%)",
        marginRight: 2,
      }}
      class={cn("hover:animate-pulse max-[200px]:hidden", className)}
    >
      <a href={appendUrlPath("/")} aria-label="Home button">
        <img
          src={appendUrlPath(`/images/${filename}`)}
          width={sizePx}
          height={sizePx}
          alt={"App logo"}
          style={{
            objectFit: "cover",
          }}
          class="z-20"
          fetchPriority={highPriority ? "high" : undefined}
        />
      </a>
    </div>
  );
}
