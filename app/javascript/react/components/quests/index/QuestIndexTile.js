import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CategoryIcon from "../../reusable/CategoryIcon";
import ReadOnlyRating from "../../reusable/ReadOnlyRating";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
  },
  ratingBG: {
    backgroundColor: theme.palette.dark.main,
    padding: theme.spacing(),
    borderRadius: 15,
  },
}));

const QuestIndexTile = (props) => {
  const classes = useStyles();
  let avgTime = "";
  let avgRating = null;

  if (props.quest.avgTime === null) {
    avgTime = "No times";
  } else {
    avgTime = props.quest.avgTime;
  }

  if (props.quest.avgRating === null) {
    avgRating = <ReadOnlyRating rating={props.quest.avgRating} color />;
  } else {
    avgRating = (
      <div className={classes.ratingBG}>
        <ReadOnlyRating rating={props.quest.avgRating} color />
      </div>
    );
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.card}>
        <CardActionArea component={RouterLink} to={`/quests/${props.quest.id}`}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <CategoryIcon category={props.quest.category} size="small" />
              </Grid>

              <Grid item xs>
                <Typography variant="h4">{props.quest.name}</Typography>
              </Grid>

              <Grid item>
                <Typography variant="h6">
                  @{props.quest.owner?.username}
                </Typography>
              </Grid>
            </Grid>

            <Grid container alignItems="flex-end" spacing={2}>
              <Grid item>{avgRating}</Grid>

              <Grid item xs />

              <Grid item>
                <Typography variant="h6">{avgTime}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default QuestIndexTile;
