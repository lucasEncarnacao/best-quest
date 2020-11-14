import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import MapShowContainer from "./MapShowContainer";

const SolvedView = (props) => {
  let photo = null;

  if (props.photo !== null) {
    photo = <img src={props.photo} alt="Location Answer Photo" />;
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h3">Answer: answer</Typography>
      </Grid>

      <Grid item>
        <Typography variant="h4">Description: {props.description}</Typography>
      </Grid>

      <Grid item>{photo}</Grid>

      <Grid item container>
        <Grid item xs>
          <MapShowContainer stepLat={props.stepLat} stepLng={props.stepLng} />
        </Grid>
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
