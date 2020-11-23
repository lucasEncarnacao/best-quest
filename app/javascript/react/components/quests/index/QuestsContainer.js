import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import QuestIndexTile from "./QuestIndexTile";
import FetchHelper from "../../../helpers/FetchHelper";

const QuestsContainer = (props) => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    FetchHelper.get("/api/v1/quests/").then((body) => {
      if (body.quests) {
        setQuests(body.quests);
      }
    });
  }, []);

  const questList = quests.map((quest) => {
    return <QuestIndexTile key={quest.id} quest={quest} />;
  });

  return (
    <Box p={2}>
      <Grid container alignItems="stretch" spacing={2}>
        {questList}
      </Grid>
    </Box>
  );
};

export default QuestsContainer;
