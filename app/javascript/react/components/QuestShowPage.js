import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import ReviewsList from "./ReviewsList";
import CategoryIcon from "./CategoryIcon";
import ReadOnlyRating from "./ReadOnlyRating";
import UserContext from "./UserContext";

const QuestShowPage = (props) => {
  const { currentUser } = useContext(UserContext);
  const [quest, setQuest] = useState({
    name: "",
    category: "",
    description: "",
    avgRating: null,
    avgTime: "",
    stepCount: 0,
    owner: {},
    reviews: [],
  });
  const questId = props.match.params.id;

  if (currentUser === "") {
    return <Redirect to="/users/sign_in" />;
  }

  useEffect(() => {
    fetch(`/api/v1/quests/${questId}`)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setQuest(body.quest);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <CategoryIcon category={quest.category} />
        <Grid item>
          <Typography variant="h2">{quest.name}</Typography>
        </Grid>
        <ReadOnlyRating rating={quest.avgRating} />
      </Grid>

      <br />

      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{quest.description}</Typography>
        </Grid>
        <Grid item xs={12} md={6} container>
          <Grid item xs={12}>
            <Typography variant="h5">Locations: {quest.stepCount}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Avg Length: {quest.avgTime}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <br />

      <Grid container justify="space-evenly">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={{
              pathname: `/quests/${questId}/active`,
              state: { group: false },
            }}
          >
            Quest Solo
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={{
              pathname: `/quests/${questId}/active`,
              state: { group: true },
            }}
          >
            Quest with Friends
          </Button>
        </Grid>
      </Grid>

      <br />

      <Typography variant="h6">Reviews ({quest.reviews.length}) -</Typography>
      <ReadOnlyRating rating={quest.avgRating} />
      <Divider />
      <ReviewsList reviews={quest.reviews} />
    </>
  );
};

export default QuestShowPage;
