import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const TopBar = (props) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Hidden smUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          <Button color="inherit" component={RouterLink} to="/">
            Best Quest
          </Button>
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
