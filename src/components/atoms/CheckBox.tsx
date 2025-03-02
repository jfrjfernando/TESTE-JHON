import { generateRandomID } from "@/utils/uid";

export function CheckBox({
  value,
  setValue,
}: {
  value: boolean;
  setValue: (value: boolean) => void;
}) {
  return (
    <input
      id={`checkbox-${generateRandomID()}`}
      type="checkbox"
      checked={value}
      onChange={(e) => setValue(e.currentTarget.checked)}
      class="w-5 h-5 accent-transparent checked:accent-active rounded-sm cursor-pointer"
      aria-label={"Check button"}
    />
  );
}
