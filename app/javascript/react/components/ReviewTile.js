import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

const ReviewTile = (props) => {
  const rating = props.review.rating;
  const comment = props.review.comment;
  let commentSection = null;

  if (comment !== null && comment !== "") {
    commentSection = <Typography>Comment: {comment}</Typography>;
  }

  return (
    <Grid item xs={10}>
      <Card>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>Rating: {rating}</Typography>
            </Grid>
            <Grid item>
              <Typography>Owner Name</Typography>
            </Grid>
          </Grid>
          {commentSection}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReviewTile;
