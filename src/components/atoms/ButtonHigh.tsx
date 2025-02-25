import { appendAssetsAPIPath } from "@/utils/path";
import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  useState,
} from "preact/compat";

export function ButtonHigh({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <button
      className={`relative px-6 py-3 text-4xl text-slate-200 rounded-lg cursor-pointer shadow-lg shadow-black hover:shadow-orange-300 hover:shadow-md hover:text-orange-200 active:shadow active:text-orange-300 disabled:text-gray-500 disabled:shadow-black disabled:shadow-sm transition-all ${props.class} disabled:cursor-not-allowed p-0`}
      style={{
        background: `url(${appendAssetsAPIPath(
          "/images/assets/border_top.webp"
        )})`,
        backgroundPosition: isHover ? "left" : "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        imageRendering: "pixelated",
        textShadow: "0 0 8px black",
        transitionDuration: "350ms",
        userSelect: "none",
      }}
      onMouseEnter={() => !props.disabled && setHover(true)}
      onMouseLeave={() => !props.disabled && setHover(false)}
      {...props}
    >
      <span
        className="absolute z-10 inset-0 bg-black opacity-30 rounded-lg"
        style={{
          opacity: props.disabled ? "70%" : isHover ? "50%" : undefined,
          transitionDuration: "350ms",
          background: props.disabled ? "black" : undefined,
        }}
      ></span>
      <div className={"z-50 relative"}>{children}</div>
    </button>
  );
}
