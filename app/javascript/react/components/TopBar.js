import React, { useContext, useEffect } from "react";
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
import UserContext from "./UserContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const TopBar = (props) => {
  const { username, signIn, signOut } = useContext(UserContext);
  const classes = useStyles();
  let loginDisplay = null;

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    fetch(`/api/v1/users/auto_sign_in`, {
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.user) {
          signIn(body.user.username);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const handleSignOut = () => {
    localStorage.setItem("userToken", "");
    signOut();
  };

  if (username !== "") {
    loginDisplay = (
      <>
        <Typography>{username}</Typography>
        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
      </>
    );
  } else {
    loginDisplay = (
      <>
        <Button color="inherit" component={RouterLink} to="/users/sign_up">
          Sign Up
        </Button>
        <Button color="inherit" component={RouterLink} to="/users/sign_in">
          Sign In
        </Button>
      </>
    );
  }

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
        {loginDisplay}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
