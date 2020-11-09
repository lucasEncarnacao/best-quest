import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

const SolvedView = (props) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h3">Answer: answer</Typography>
      </Grid>

      <Grid item>
        <Typography variant="h4">Description: {props.description}</Typography>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={props.nextClueClick}
        >
          Next Clue
        </Button>
      </Grid>
    </Grid>
  );
};

export default SolvedView;
