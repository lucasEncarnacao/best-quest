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

const QuestIndexTile = (props) => {
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

              <Typography>Owner name</Typography>
            </Grid>

            <Grid container>
              <Grid item xs>
                <Typography>Avg Rating: 4.5</Typography>
              </Grid>

              <Typography>Avg Length: 1 hr 32 min</Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default QuestIndexTile;
