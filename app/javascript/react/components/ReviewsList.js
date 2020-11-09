import React from "react";
import { Grid } from "@material-ui/core";
import ReviewTile from "./ReviewTile";

const ReviewsList = (props) => {
  const reviews = props.reviews?.map((review) => {
    return <ReviewTile key={review.id} review={review} />;
  });

  return (
    <Grid container justify="center" spacing={1}>
      {reviews}
    </Grid>
  );
};

export default ReviewsList;
