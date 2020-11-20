import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import QuestIndexTile from "./QuestIndexTile";

const QuestsContainer = (props) => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    fetch("/api/v1/quests/")
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
        setQuests(body.quests);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
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
