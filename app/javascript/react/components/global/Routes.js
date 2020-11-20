import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../home/HomePage";
import HowToPage from "../howTo/HowToPage";
import QuestsIndexPage from "../quests/index/QuestsIndexPage";
import QuestNewPage from "../quests/new/QuestNewPage";
import QuestShowPage from "../quests/show/QuestShowPage";
import QuestActivePage from "../quests/active/QuestActivePage";
import SignUpPage from "../auth/SignUpPage";
import SignInPage from "../auth/SignInPage";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/how-to-play" component={HowToPage} />
      <Route exact path="/quests" component={QuestsIndexPage} />
      <Route exact path="/quests/new" component={QuestNewPage} />
      <Route exact path="/quests/:id" component={QuestShowPage} />
      <Route exact path="/quests/:id/active" component={QuestActivePage} />
      <Route exact path="/users/sign_up" component={SignUpPage} />
      <Route exact path="/users/sign_in" component={SignInPage} />
    </Switch>
  );
};

export default Routes;
