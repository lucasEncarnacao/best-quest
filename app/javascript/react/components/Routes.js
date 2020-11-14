import React from "react";
import { Route, Switch } from "react-router-dom";
import QuestsIndexPage from "./QuestsIndexPage";
import QuestsShowPage from "./QuestShowPage";
import QuestsNewPage from "./QuestNewPage";
import QuestActivePage from "./QuestActivePage";
import QuestCompletePage from "./QuestCompleteView";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import HowToPage from "./HowToPage";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/how-to-play" component={HowToPage} />
      <Route exact path="/quests" component={QuestsIndexPage} />
      <Route exact path="/quests/new" component={QuestsNewPage} />
      <Route exact path="/quests/:id" component={QuestsShowPage} />
      <Route exact path="/quests/:id/active" component={QuestActivePage} />
      <Route exact path="/quests/:id/complete" component={QuestCompletePage} />
      <Route exact path="/users/sign_up" component={SignUpPage} />
      <Route exact path="/users/sign_in" component={SignInPage} />
    </Switch>
  );
};

export default Routes;
