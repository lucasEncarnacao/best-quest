import React from "react";
import { Drawer, Hidden, Toolbar } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import NavDrawerItems from "./NavDrawerItems";

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

const NavDrawer = (props) => {
  const classes = useStyles();

  const drawer = (
    <NavDrawerItems handleDrawerToggle={props.handleDrawerToggle} />
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp>
        <Drawer
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default NavDrawer;
