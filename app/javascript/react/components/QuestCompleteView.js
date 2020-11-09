import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const QuestCompleteView = (props) => {
  const [formFields, setFormFields] = useState({
    rating: 3,
    comment: "",
  });

  const handleFieldChange = (event) => {
    let newValue = event.currentTarget.value;

    if (event.currentTarget.name === "rating") {
      newValue = parseInt(newValue);
    }

    setFormFields({
      ...formFields,
      [event.currentTarget.name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayload = { review: formFields };
    props.addNewReview(formPayload);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h3">Congratulations!</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h4">You conquered the Quest!</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">
            Final time: {props.completionTime}
          </Typography>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography htmlFor="rating" component="legend">
              Rating
            </Typography>
            <Rating
              id="rating"
              name="rating"
              value={formFields.rating}
              onChange={handleFieldChange}
            />
          </Grid>

          <Grid item container justify="center">
            <Grid item xs={8} md={6}>
              <TextField
                type="text"
                name="comment"
                label="Comment"
                multiline
                rowsMax={4}
                fullWidth
                onChange={handleFieldChange}
                value={formFields.comment}
              />
            </Grid>
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Add Review
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default QuestCompleteView;
