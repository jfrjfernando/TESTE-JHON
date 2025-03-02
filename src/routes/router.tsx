import { LoadingOverlay } from "@/components/atoms/LoadingOverlay";
import { NotFound } from "@/components/atoms/NotFound";
import { CardPage } from "@/components/pages/Card";
import { GroupPage } from "@/components/pages/Group";
import { HomePage } from "@/components/pages/Home";
import { PoolPage } from "@/components/pages/Pool";
import { SimulatorPage } from "@/components/pages/Simulator";
import { appendUrlPath } from "@/utils/path";
import Router, { Route } from "preact-router";
import { useState } from "preact/hooks";

export function Routes() {
  const [loading, setLoading] = useState(false);

  const handleRouteChange = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 450);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <Router
        onChange={(e) => {
          if (e.previous) {
            handleRouteChange();
          }
        }}
      >
        <Route component={HomePage} path={appendUrlPath("/")} />
        <Route component={SimulatorPage} path={appendUrlPath("/simulator")} />
        <Route component={CardPage} path={appendUrlPath("/cards/:id")} />
        <Route component={GroupPage} path={appendUrlPath("/groups/:id")} />
        <Route component={PoolPage} path={appendUrlPath("/pool")} />
        <Route component={NotFound} default />
      </Router>
    </>
  );
}
