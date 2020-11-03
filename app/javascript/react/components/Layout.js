import React from "react";
import { Route, Switch } from "react-router-dom";
import QuestsIndexPage from "./QuestsIndexPage";

const Layout = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={QuestsIndexPage} />
    </Switch>
  );
};

export default Layout;
