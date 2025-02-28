import { useEffect } from "preact/hooks";

export function useInput(
  inputs: {
    keys: string[];
    action: () => void;
  }[],
  targetElementId?: HTMLDivElement["id"]
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const input = inputs.find((input) => input.keys.includes(event.code));

      if (input) {
        event.preventDefault();
        input.action();
      }
    };

    (targetElementId
      ? document.getElementById(targetElementId) ?? document
      : document
    ).addEventListener("keydown", handleKeyDown as EventListener);
    return () => {
      (targetElementId
        ? document.getElementById(targetElementId) ?? document
        : document
      ).removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [inputs]);
}
