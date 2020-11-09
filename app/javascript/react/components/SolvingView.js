import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

const SolvingView = (props) => {
  let errorMessage = null;
  let giveUpButton = null;

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
        >
          Am I there yet?
        </Button>
      </Grid>

      <Grid item>{errorMessage}</Grid>

      <Grid item>{props.hintSection}</Grid>

      <Grid item>{giveUpButton}</Grid>
    </Grid>
  );
};

export default SolvingView;
