import React, { useState } from "react";
import { Box, Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme";
import TopBar from "./TopBar";
import NavDrawer from "./NavDrawer";
import Routes from "./Routes";

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
          <Routes />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
