import "./app.css";
import { CoreProvider } from "./providers/core.provider";

export function App() {
  return (
    <CoreProvider>
      <div className={"absolute bg-red-400 w-full h-full"}>dw</div>
    </CoreProvider>
  );
}
