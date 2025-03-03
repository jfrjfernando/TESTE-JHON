import { Helmet } from "@notwoods/preact-helmet";
import { useMemo } from "preact/hooks";

const TITLE_TEMPLATE = "Fusion Simulator - Yu-Gi-Oh! Forbidden Memories";

export function DynamicHead({
  title,
  titlePrefix,
  titleSuffix,
  description,
  keywords,
}: {
  title?: string;
  titleSuffix?: string;
  titlePrefix?: string;
  description: string;
  keywords: string;
}) {
  const titleValue = useMemo(
    () =>
      titlePrefix
        ? `${titlePrefix} - ${TITLE_TEMPLATE}`
        : titleSuffix
        ? `${TITLE_TEMPLATE} - ${titleSuffix}`
        : title ?? TITLE_TEMPLATE,
    [titleSuffix]
  );

  return (
    <Helmet
      title={titleValue}
      meta={[
        { name: "keywords", content: keywords },
        { name: "description", content: description },
        { property: "og:title", content: titleValue },
        { property: "og:description", content: description },
        { name: "twitter:title", content: titleValue },
        { name: "twitter:description", content: description },
      ]}
    />
  );
}
