import React, { useState } from "react";
import { Box, Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import UserProvider from "../auth/user/UserProvider";
import theme from "./theme";
import TopBar from "./TopBar";
import NavDrawer from "./nav/NavDrawer";
import Routes from "./Routes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    margin: -theme.spacing(),
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
      <UserProvider>
        <Box className={classes.root}>
          <TopBar handleDrawerToggle={handleDrawerToggle} />
          <NavDrawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box className={classes.content}>
            <Toolbar />
            <Routes />
          </Box>
        </Box>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Layout;
