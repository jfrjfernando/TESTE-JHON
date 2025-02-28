import { LoadingSpinner } from "./LoadingSpinner";

export function LoadingOverlay() {
  return (
    <div className={"transition-all"}>
      <div
        class={
          "z-40 fixed w-[100vw] h-[100vh] left-0 top-0 bg-black opacity-70"
        }
      />
      <div
        className={"fixed z-50 left-[50%] top-[50%]"}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <LoadingSpinner size={52} />
      </div>
    </div>
  );
}
