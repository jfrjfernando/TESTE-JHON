import { appendUrlPath } from "@/utils/path";

export function Logo({ size }: { size: number }) {
  return (
    <div
      style={{
        height: `${size * 0.3}px!important`,
        width: `${size}px`,
        transform: "translate(0, 5%)",
      }}
      class="hover:animate-pulse max-[200px]:hidden"
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
