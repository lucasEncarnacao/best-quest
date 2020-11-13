import React from "react";
import { Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const ReadOnlyRating = (props) => {
  let rating = null;

  if (props.rating === null) {
    rating = <Typography>No Ratings</Typography>;
  } else {
    rating = (
      <Rating value={props.rating} precision={0.5} size="small" readOnly />
    );
  }

  return rating;
};

export default ReadOnlyRating;
