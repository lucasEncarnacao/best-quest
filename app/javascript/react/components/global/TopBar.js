import React, { useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../auth/user/UserContext";
import FetchHelper from "../../helpers/FetchHelper";
import logo from "../../../../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Carter One, sans-serif",
  },
  titleButton: {
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    borderRadius: 30,
    marginLeft: theme.spacing(2),
  },
  logo: {
    maxWidth: 40,
  },
}));

const TopBar = (props) => {
  const { currentUser, signIn, signOut, updateAutoSignInCheck } = useContext(
    UserContext
  );
  const classes = useStyles();
  let loginDisplay = null;

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    FetchHelper.get(`/api/v1/users/auto_sign_in`, userToken).then((body) => {
      if (body.user) {
        signIn(body.user.username);
      }
      updateAutoSignInCheck(true);
    });
  }, []);

  const handleSignOut = () => {
    localStorage.setItem("userToken", "");
    signOut();
  };

  if (currentUser !== "") {
    loginDisplay = (
      <>
        <Hidden xsDown>
          <Typography variant="h6">{currentUser}</Typography>
        </Hidden>
        <Button
          className={classes.button}
          variant="outlined"
          color="inherit"
          size="large"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </>
    );
  } else {
    loginDisplay = (
      <>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
          size="large"
          component={RouterLink}
          to="/users/sign_up"
        >
          Sign Up
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          size="large"
          component={RouterLink}
          to="/users/sign_in"
        >
          Sign In
        </Button>
      </>
    );
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
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
            <Button
              className={classes.titleButton}
              color="inherit"
              component={RouterLink}
              to="/"
            >
              <Typography variant="h5" className={classes.title}>
                Best Quest
              </Typography>
            </Button>
          </Grid>

          <Grid item>
            <Hidden xsDown>
              <img className={classes.logo} src={logo} alt="logo" />
            </Hidden>
          </Grid>

          <Grid item xs></Grid>

          {loginDisplay}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
