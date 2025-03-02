import { useEffect } from "preact/hooks";

export function useInput(
  binds: {
    keys: string[];
    action: () => void;
  }[],
  targetElementId?: HTMLDivElement["id"]
) {
  useEffect(() => {
    // Keyboard
    const handleKeyDown = (event: KeyboardEvent) => {
      const input = binds.find((input) => input.keys.includes(event.code));

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
  }, [binds]);
}
