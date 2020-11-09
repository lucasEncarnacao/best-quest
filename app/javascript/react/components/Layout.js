import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Box, Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme";
import QuestsIndexPage from "./QuestsIndexPage";
import QuestsShowPage from "./QuestShowPage";
import QuestsNewPage from "./QuestNewPage";
import QuestActivePage from "./QuestActivePage";
import QuestCompletePage from "./QuestCompleteView";
import TopBar from "./TopBar";
import NavDrawer from "./NavDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <TopBar handleDrawerToggle={handleDrawerToggle} />
        <NavDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box className={classes.content}>
          <Toolbar />
          <Switch>
            <Route exact path="/" component={QuestsIndexPage} />
            <Route exact path="/quests" component={QuestsIndexPage} />
            <Route exact path="/quests/new" component={QuestsNewPage} />
            <Route exact path="/quests/:id" component={QuestsShowPage} />
            <Route
              exact
              path="/quests/:id/active"
              component={QuestActivePage}
            />
            <Route
              exact
              path="/quests/:id/complete"
              component={QuestCompletePage}
            />
          </Switch>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
