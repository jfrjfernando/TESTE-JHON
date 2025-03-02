import { DataLoadingBody } from "@/components/atoms/DataLoadingBody";
import { DataContext } from "@/contexts/data.context";
import { useDataVolatile } from "@/hooks/data.hook";

// TODO: Use browser database storage (disc instead of ram).
export function DataProvider({
  children,
  dataLessComponents,
}: React.PropsWithChildren<{
  dataLessComponents: [React.ReactElement[], React.ReactElement[]];
}>) {
  const { cards, groups } = useDataVolatile();

  return (
    <>
      {dataLessComponents[0]}
      {cards && groups ? (
        <DataContext.Provider
          value={{
            cards,
            groups,
          }}
        >
          {children}
        </DataContext.Provider>
      ) : (
        <DataLoadingBody />
      )}
      {dataLessComponents[1]}
    </>
  );
}
