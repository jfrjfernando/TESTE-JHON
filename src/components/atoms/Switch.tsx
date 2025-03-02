import { generateRandomID } from "@/utils/uid";
import { useMemo } from "preact/hooks";

export function Switch({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (value: boolean) => void;
}) {
  const id = useMemo(() => `switch-component-${generateRandomID()}`, []);

  return (
    <div class="relative inline-block w-11 h-5">
      <form>
        <input
          id={id}
          checked={checked}
          type="checkbox"
          class="peer appearance-none w-11 h-6 bg-gradient-three rounded-full checked:bg-gradient-three cursor-pointer transition-colors duration-300"
          onChange={(event) => setChecked((event.target as any)?.checked)}
          aria-label={"Switch button"}
        />
        <label
          for={id}
          class="absolute top-0 left-0 w-6 h-6 bg-secondary rounded-full border shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:bg-active cursor-pointer"
        />
      </form>
    </div>
  );
}
