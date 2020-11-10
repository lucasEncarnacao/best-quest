import React from "react";
import { Route, Switch } from "react-router-dom";
import QuestsIndexPage from "./QuestsIndexPage";
import QuestsShowPage from "./QuestShowPage";
import QuestsNewPage from "./QuestNewPage";
import QuestActivePage from "./QuestActivePage";
import QuestCompletePage from "./QuestCompleteView";
import QuestGroupPage from "./QuestGroupPage";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={QuestsIndexPage} />
      <Route exact path="/quests" component={QuestsIndexPage} />
      <Route exact path="/quests/new" component={QuestsNewPage} />
      <Route exact path="/quests/:id" component={QuestsShowPage} />
      <Route exact path="/quests/:id/active" component={QuestActivePage} />
      <Route exact path="/quests/:id/complete" component={QuestCompletePage} />
      <Route exact path="/quests/:id/group" component={QuestGroupPage} />
    </Switch>
  );
};

export default Routes;
