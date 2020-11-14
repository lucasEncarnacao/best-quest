import React from "react";
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonLoading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
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
    errorMessage = <Typography>{props.error}</Typography>;
  }

  if (props.badLocCounter >= 3) {
    giveUpButton = (
      <Button variant="contained" color="secondary" onClick={props.giveUpClick}>
        Give up
      </Button>
    );
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h3" align="center">
          Clue: {props.clue}
        </Typography>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
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
  );
};

export default SolvingView;
