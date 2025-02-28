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
      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm cursor-pointer"
    />
  );
}
