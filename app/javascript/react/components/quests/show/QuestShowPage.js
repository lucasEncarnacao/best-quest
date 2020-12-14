import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CategoryIcon from "../../reusable/CategoryIcon";
import ReadOnlyRating from "../../reusable/ReadOnlyRating";
import ReviewsList from "./ReviewsList";
import UserContext from "../../auth/user/UserContext";
import FetchHelper from "../../../helpers/FetchHelper";

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: theme.palette.dark.main,
    minHeight: "88vh",
  },
  card: {
    backgroundColor: theme.palette.tertiary.main,
  },
  description: {
    fontFamily: "Dosis, sans-serif",
  },
  reviewText: {
    fontFamily: "Dosis, sans-serif",
  },
  questContents: {
    backgroundColor: "#FFF",
    margin: -theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const QuestShowPage = (props) => {
  const classes = useStyles();
  const { currentUser, checkedAutoSignIn } = useContext(UserContext);
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
  const [authorized, setAuthorized] = useState(true);
  const questId = props.match.params.id;
  let avgTime = null;

  useEffect(() => {
    if (checkedAutoSignIn && currentUser === "") {
      setAuthorized(false);
    } else {
      FetchHelper.get(`/api/v1/quests/${questId}`).then((body) => {
        if (body.quest) {
          setQuest(body.quest);
        }
      });
    }
  }, [checkedAutoSignIn, currentUser]);

  if (quest.avgTime !== null) {
    avgTime = `${quest.avgTime}`;
  } else {
    avgTime = "No times yet";
  }

  if (!authorized) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <Box p={2} className={classes.page}>
      <Box className={classes.questContents}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <CategoryIcon category={quest.category} size="medium" />
          </Grid>
          <Grid item xs>
            <Typography variant="h2">{quest.name}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/quests"
            >
              Back
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" className={classes.description}>
              {quest.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} container direction="column">
            <Card className={classes.card}>
              <Box p={2}>
                <Grid item>
                  <Typography variant="h4">
                    Locations: {quest.stepCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">Avg Length: {avgTime}</Typography>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box my={4}>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
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
                color="secondary"
                size="large"
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
        </Box>

        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Typography variant="h5" className={classes.reviewText}>
              Reviews ( {quest.reviews.length} )
            </Typography>
          </Grid>
          <Grid item>
            <ReadOnlyRating rating={quest.avgRating} size="medium" />
          </Grid>
        </Grid>
      </Box>

      <Box py={4}>
        <ReviewsList reviews={quest.reviews} />
      </Box>
    </Box>
  );
};

export default QuestShowPage;
