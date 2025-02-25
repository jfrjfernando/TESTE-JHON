import "./app.css";
import "./layout.css";
import { HomePage } from "./components/pages/Home";
import { CoreProvider } from "./providers/core.provider";

export function App() {
  return (
    <CoreProvider>
      <HomePage />
    </CoreProvider>
  );
}
