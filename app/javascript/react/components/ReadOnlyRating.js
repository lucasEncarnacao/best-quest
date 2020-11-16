import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  iconFilled: {
    color: theme.palette.tertiary.dark,
  },
}));

const ReadOnlyRating = (props) => {
  const classes = useStyles();
  let rating = null;
  let size = "small";

  if (props.size) {
    size = props.size;
  }

  if (props.rating === null) {
    rating = <Typography variant="h6">No Ratings</Typography>;
  } else {
    if (props.color) {
      rating = (
        <Rating
          className={classes.iconFilled}
          value={props.rating}
          precision={0.5}
          size={size}
          readOnly
        />
      );
    } else {
      rating = (
        <Rating value={props.rating} precision={0.5} size={size} readOnly />
      );
    }
  }

  return rating;
};

export default ReadOnlyRating;
