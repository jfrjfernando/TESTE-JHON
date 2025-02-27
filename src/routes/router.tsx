import { CardPage } from "@/components/pages/Card";
import { HomePage } from "@/components/pages/Home";
import { Simulator } from "@/components/templates/Simulator";
import { appendUrlPath } from "@/utils/path";
import Router, { Route } from "preact-router";

export function Routes() {
  return (
    <Router>
      <Route default component={HomePage} path={appendUrlPath("/")} />
      <Route component={Simulator} path={appendUrlPath("/simulator")} />
      <Route component={CardPage} path={appendUrlPath("/cards/:id")} />
    </Router>
  );
}
