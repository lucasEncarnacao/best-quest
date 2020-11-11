import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

const QuestLobbyView = (props) => {
  const { lobbyId, lobbyCode } = props;

  useEffect(() => {
    props.setUpLobbyChannel(lobbyId);
  }, []);

  const startClick = () => {
    props.startQuest();
  };

  return (
    <Grid container>
      <Typography>{lobbyCode}</Typography>
      <Button variant="contained" color="primary" onClick={startClick}>
        Start Quest
      </Button>
    </Grid>
  );
};

export default QuestLobbyView;
