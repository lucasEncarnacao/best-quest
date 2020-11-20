import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MapShowContainer from "../../maps/MapShowContainer";

const useStyles = makeStyles((theme) => ({
  regFont: {
    fontFamily: "Dosis, sans-serif",
  },
  photo: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const SolvedView = (props) => {
  const classes = useStyles();
  let photo = null;

  if (props.photo !== null) {
    photo = (
      <Grid item xs={12} md container alignItems="center" justify="center">
        <Grid item>
          <img
            className={classes.photo}
            src={props.photo}
            alt="Location Answer Photo"
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Box p={4}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h3">Answer: {props.answer}</Typography>
        </Grid>

        <Grid item>
          <Typography className={classes.regFont} variant="h4">
            {props.description}
          </Typography>
        </Grid>

        <Grid item container spacing={3}>
          {photo}

          <Grid item xs={12} md>
            <MapShowContainer stepLat={props.stepLat} stepLng={props.stepLng} />
          </Grid>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={props.nextClueClick}
          >
            Next Clue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SolvedView;
