import React from "react";
import { Route, Switch } from "react-router-dom";
import QuestsIndexPage from "./QuestsIndexPage";
import QuestsShowPage from "./QuestShowPage";

const Layout = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={QuestsIndexPage} />
      <Route exact path="/quests" component={QuestsIndexPage} />
      <Route exact path="/quests/:id" component={QuestsShowPage} />
    </Switch>
  );
};

export default Layout;
