import "./app.css";
import "./layout.css";
import { CoreProvider } from "./providers/core.provider";
import { Routes } from "./routes/router";
import { NavigationBar } from "./components/organisms/NavigationBar";
import { useRouter } from "preact-router";
import { appendAssetsAPIPath } from "./utils/path";
import { useMemo } from "preact/hooks";

export function App() {
  const [{ url }] = useRouter();
  const isInSimulator = useMemo(() => url.includes("simulator"), [url]);

  return (
    <CoreProvider>
      <>
        {!isInSimulator && (
          <img
            src={appendAssetsAPIPath("/images/assets/main_background.jpg")}
            alt={"Background image"}
            width={"100%"}
            height={"100%"}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              animation: "saturationAnimation2 12000ms infinite",
              filter: "sepia(5px)",
              transform: "scaleX(-1)",
            }}
            className={"-z-50"}
          />
        )}
        <NavigationBar />
        <Routes />
      </>
    </CoreProvider>
  );
}
