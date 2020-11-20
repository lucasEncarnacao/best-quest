import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "68vh",
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.dark.contrastText,
  },
  buttonLoading: {
    position: "absolute",
    color: theme.palette.secondary.main,
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  regFont: {
    fontFamily: "Dosis, sans-serif",
  },
  underline: {
    textDecoration: "underline",
  },
}));

const SolvingView = (props) => {
  const classes = useStyles();
  let buttonLoad = null;
  let errorMessage = null;
  let giveUpButton = null;

  if (props.loading) {
    buttonLoad = (
      <CircularProgress size={24} className={classes.buttonLoading} />
    );
  }

  if (props.error !== "") {
    errorMessage = <Typography variant="h6">{props.error}</Typography>;
  }

  if (props.badLocCounter >= 3) {
    giveUpButton = (
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={props.giveUpClick}
      >
        Give up
      </Button>
    );
  }

  return (
    <Box className={classes.page} p={10}>
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Typography className={classes.underline} variant="h2" align="center">
            Clue {props.stepNum}
          </Typography>
        </Grid>

        <Grid item>
          <Typography className={classes.regFont} variant="h3" align="center">
            {props.clue}
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={props.checkLocation}
            disabled={props.loading}
          >
            Am I there yet?
            {buttonLoad}
          </Button>
        </Grid>

        <Grid item>{errorMessage}</Grid>

        <Grid item>{props.hintSection}</Grid>

        <Grid item>{giveUpButton}</Grid>
      </Grid>
    </Box>
  );
};

export default SolvingView;
