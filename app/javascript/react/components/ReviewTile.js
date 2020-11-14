import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ReadOnlyRating from "./ReadOnlyRating";

const ReviewTile = (props) => {
  const { rating, comment, ownerName } = props.review;
  let commentSection = null;

  if (comment !== null && comment !== "") {
    commentSection = <Typography>{comment}</Typography>;
  }

  return (
    <Grid item xs={10}>
      <Card>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <ReadOnlyRating rating={rating} />
            </Grid>
            <Grid item>
              <Typography>{ownerName}</Typography>
            </Grid>
          </Grid>
          {commentSection}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReviewTile;
