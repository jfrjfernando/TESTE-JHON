import "./app.css";
import "./layout.css";
import { CoreProvider } from "./providers/core.provider";
import { Routes } from "./routes/router";
import { NavigationBar } from "./components/organisms/NavigationBar";
import { useRouter } from "preact-router";
import { appendAssetsAPIPath } from "./utils/path";
import { useMemo } from "preact/hooks";
import { Footer } from "./components/organisms/Footer";
import { DynamicHead } from "./components/molecules/Helmet";

export function App() {
  const [{ url }] = useRouter();
  const isInSimulator = useMemo(() => url.includes("simulator"), [url]);

  return (
    <CoreProvider
      dataLessComponents={[
        [
          !isInSimulator ? (
            <img
              srcset={`${appendAssetsAPIPath(
                "/images/assets/main_background.webp"
              )} 1920w, 
                ${appendAssetsAPIPath(
                  "/images/assets/main_background-1280x516.webp"
                )} 1280w, 
                ${appendAssetsAPIPath(
                  "/images/assets/main_background-640x258.webp"
                )} 640w`}
              sizes="(max-width: 767px) 640px, 
               (max-width: 1024px) 1280px, 
               1920px"
              src={appendAssetsAPIPath("/images/assets/main_background.webp")}
              alt={"Background image"}
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
                willChange: "transform",
              }}
              className={"-z-50"}
            />
          ) : (
            <></>
          ),
          <NavigationBar />,
        ],
        [<Footer />],
      ]}
    >
      <DynamicHead
        description="Experience the ultimate Yu-Gi-Oh! Fusion Simulator. Browse all fusion cards, discover new combinations, and test your skills in a fusion playground. Perfect for TCG and OCG players!"
        keywords="fusion, simulator, yu-gi-oh, forbidden-memories, fm, all cards, all fusions"
      />
      <Routes />
    </CoreProvider>
  );
}
