import { padToThreeDigits } from "../utils/strings";
import Sitemap from "vite-plugin-sitemap";

function generateMainRoutes() {
  return ["/", "/simulator", "/pool"];
}

function generateCards() {
  return Array.from({ length: 722 }).map(
    (_, index) => `/cards/${padToThreeDigits(index + 1)}`
  );
}

export function generateSitemap({
  hostname,
  outDir,
}: {
  hostname: string;
  outDir: string;
}) {
  return Sitemap({
    hostname,
    outDir,
    dynamicRoutes: [...generateMainRoutes(), ...generateCards()],
  });
}
