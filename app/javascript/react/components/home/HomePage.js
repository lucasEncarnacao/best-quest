import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../auth/user/UserContext";
import logo from "../../../../assets/images/logo.png";
import magnifier from "../../../../assets/images/homepage/magnifier.png";
import mobile from "../../../../assets/images/homepage/mobile.png";
import path from "../../../../assets/images/homepage/path.png";

const useStyles = makeStyles((theme) => ({
  topSection: {
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.tertiary.main,
  },
  mainSection: {
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.dark.contrastText,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw))",
  },
  ventureSection: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.dark.contrastText,
    clipPath: "polygon(0 6vw, 100% 0, 100% 100%, 0 calc(100% - 6vw))",
  },
  title: {
    textShadow: "3px 3px 3px #000",
  },
  darkText: {
    color: theme.palette.dark.main,
  },
  bodyFont: {
    fontFamily: "Dosis, sans-serif",
  },
  picture: {
    width: "100%",
    maxWidth: 300,
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);
  let mainButton = null;

  if (currentUser === "") {
    mainButton = (
      <Button
        variant="contained"
        color="secondary"
        size="large"
        component={RouterLink}
        to="/users/sign_up"
      >
        Sign Up
      </Button>
    );
  } else {
    mainButton = (
      <Button
        variant="contained"
        color="secondary"
        size="large"
        component={RouterLink}
        to="/quests"
      >
        Find Quests
      </Button>
    );
  }

  return (
    <>
      <Box className={classes.topSection} pt={4}>
        <Typography variant="h1" align="center" className={classes.title}>
          Best Quest
        </Typography>
      </Box>

      <Box className={classes.mainSection} p={6} pb={15}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={7}
            container
            direction="column"
            spacing={3}
            alignItems="center"
            justify="center"
          >
            <Grid item align="center">
              <Box>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.bodyFont}
                >
                  Find user-curated scavenger hunts in your area and venture out
                  on your own or with friends
                </Typography>
              </Box>
            </Grid>
            <Grid item>{mainButton}</Grid>
          </Grid>

          <Grid item xs={12} md={5} align="center">
            <Box pl={4} pt={4}>
              <img className={classes.picture} src={logo} alt="logo" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box p={4}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={5} align="center">
            <Box pb={4}>
              <img
                className={classes.picture}
                src={magnifier}
                alt="magnifiying glass"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={7} align="center">
            <Box style={{ width: 300 }}>
              <Typography variant="h4" align="center" color="primary">
                Find Quests
              </Typography>
              <Typography
                variant="h5"
                align="justify"
                className={classes.bodyFont}
              >
                Search for quests in your area. Find quests based on category,
                rating, or length
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.ventureSection} p={6} py={15}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={7} align="center">
            <Box style={{ width: 300 }}>
              <Typography
                variant="h4"
                align="center"
                className={classes.darkText}
              >
                Venture Forth
              </Typography>
              <Typography
                variant="h5"
                align="justify"
                className={classes.bodyFont}
              >
                Venture on quests by going to real world locations and checking
                your location on your mobile device
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} align="center">
            <Box pt={4}>
              <img
                className={classes.picture}
                src={mobile}
                alt="mobile devices"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box pb={6}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={5} align="center">
            <Box pb={4}>
              <img className={classes.picture} src={path} alt="quest path" />
            </Box>
          </Grid>

          <Grid item xs={12} md={7} align="center">
            <Box style={{ width: 300 }}>
              <Typography variant="h4" align="center" color="primary">
                Create Quests
              </Typography>
              <Typography
                variant="h5"
                align="justify"
                className={classes.bodyFont}
              >
                Create your own quests for others to enjoy! Challenge your
                friends and family to conquer your quests
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
