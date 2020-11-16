import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CategoryIcon from "./CategoryIcon";

const useStyles = makeStyles((theme) => ({
  darkSection: {
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.dark.contrastText,
  },
  lightSection: {
    color: theme.palette.dark.main,
  },
  blueSection: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.dark.main,
  },
  topSection: {
    color: theme.palette.dark.main,
  },
  regFont: {
    fontFamily: "Dosis, sans-serif",
    padding: theme.spacing(3),
  },
}));

const HowToPage = (props) => {
  const classes = useStyles();

  return (
    <>
      <Box pt={4} pb={6}>
        <Typography className={classes.topSection} variant="h2" align="center">
          How to play
        </Typography>
      </Box>

      <Grid container direction="column" alignItems="center" spacing={6}>
        <Grid
          item
          container
          alignItems="center"
          className={classes.darkSection}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h3" align="center" paragraph>
              Search for Quests
            </Typography>
            <Box px={6}>
              <Typography
                className={classes.regFont}
                variant="h5"
                align="center"
              >
                Look for quests in your area based on category, rating, or
                length
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} container>
            <Grid item xs={6} align="center">
              <Box pb={4}>
                <CategoryIcon category={"art"} size="large" />
                <Typography variant="h4">Art</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} align="center">
              <Box pb={4}>
                <CategoryIcon category={"food"} size="large" />
                <Typography variant="h4">Food</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} align="center">
              <CategoryIcon category={"history"} size="large" />
              <Typography variant="h4">History</Typography>
            </Grid>
            <Grid item xs={6} align="center">
              <CategoryIcon category={"misc"} size="large" />
              <Typography variant="h4">Misc</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs
          container
          justify="center"
          className={classes.lightSection}
        >
          <Grid item xs={12} md={7}>
            <Box py={4}>
              <Typography variant="h3" align="center" paragraph>
                Quest Solo or with friends
              </Typography>
              <Typography
                className={classes.regFont}
                variant="h5"
                align="center"
              >
                Explore alone or with friends! Create a lobby and share the
                lobby code with others for them to join in on the fun
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs
          container
          justify="center"
          className={classes.blueSection}
        >
          <Grid item xs={12} md={7}>
            <Box py={4}>
              <Typography variant="h3" align="center" paragraph>
                Go Forth!
              </Typography>
              <Typography
                className={classes.regFont}
                variant="h5"
                align="justify"
              >
                After starting a quest, a clue will be shown pointing to a real
                world location. Go there and select "Am I There Yet?" to see if
                you are at the correct location. (Make sure to allow location
                permissions!)
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs
          container
          justify="center"
          className={classes.lightSection}
        >
          <Grid item xs={12} md={7}>
            <Box py={4}>
              <Typography variant="h3" align="center" paragraph>
                Stuck?
              </Typography>
              <Typography
                className={classes.regFont}
                variant="h5"
                align="justify"
              >
                If you are stumped, you can reveal a hint to nudge you in the
                right direction or give up on that clue and advance to the next
                one
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs
          container
          justify="center"
          className={classes.darkSection}
        >
          <Grid item xs={12} md={7}>
            <Box py={4}>
              <Typography variant="h3" align="center" paragraph>
                Conquer
              </Typography>
              <Typography
                className={classes.regFont}
                variant="h5"
                align="justify"
              >
                Continue finding clues and advancing until you beat the quest!
                Don't forget to review it so others know which quest is the best
                quest!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HowToPage;
