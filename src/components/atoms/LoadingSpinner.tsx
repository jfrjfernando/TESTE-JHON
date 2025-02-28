import { Loader } from "lucide-react";

export function LoadingSpinner({ size }: { size?: number }) {
  return <Loader className={"animate-spin"} size={size} />;
}
