import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import ReviewsList from "./ReviewsList";
import CategoryIcon from "./CategoryIcon";

const QuestShowPage = (props) => {
  const [quest, setQuest] = useState({
    name: "",
    description: "",
  });
  const quest_id = props.match.params.id;

  useEffect(() => {
    fetch(`/api/v1/quests/${quest_id}`)
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
        <Typography variant="h6">Avg Rating: 4.5</Typography>
      </Grid>

      <br />

      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{quest.description}</Typography>
        </Grid>
        <Grid item xs={12} md={6} container>
          <Grid item xs={12}>
            <Typography variant="h5"># of Locations: 5</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Avg Length: 1 hr 23 min</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Number of conquerers: 41</Typography>
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
            to={`/quests/${quest_id}/active`}
          >
            Quest Solo
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/quests/${quest_id}/active`}
          >
            Quest with Friends
          </Button>
        </Grid>
      </Grid>

      <br />

      <Typography variant="h6">Reviews (203) - Avg Rating: 4.5</Typography>
      <Divider />
      <ReviewsList reviews={quest.reviews} />
    </>
  );
};

export default QuestShowPage;
