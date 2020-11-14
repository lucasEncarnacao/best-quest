import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import CategoryIcon from "./CategoryIcon";
import ReadOnlyRating from "./ReadOnlyRating";

const QuestIndexTile = (props) => {
  let avgTime = "";

  if (props.quest.avgTime === null) {
    avgTime = "No times";
  } else {
    avgTime = props.quest.avgTime;
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardActionArea component={RouterLink} to={`/quests/${props.quest.id}`}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <CategoryIcon category={props.quest.category} />

              <Grid item xs>
                <Typography>{props.quest.name}</Typography>
              </Grid>

              <Typography>{props.quest.owner?.username}</Typography>
            </Grid>

            <Grid container>
              <Grid item xs>
                <ReadOnlyRating rating={props.quest.avgRating} />
              </Grid>

              <Typography>{avgTime}</Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default QuestIndexTile;
