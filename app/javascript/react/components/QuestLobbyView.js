import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";

const QuestLobbyView = (props) => {
  const { questId, lobbyId, lobbyCode } = props;

  const [test, setTest] = useState("test");

  useEffect(() => {
    App.LobbyChannel = App.cable.subscriptions.create(
      {
        channel: "LobbyChannel",
        lobby_id: lobbyId,
      },
      {
        connected: () => console.log("LobbyChannel connected"),
        disconnected: () => console.log("LobbyChannel disconnected"),
        received: (data) => {
          setTest("it works");
        },
      }
    );
  }, []);

  const testClick = () => {
    App.LobbyChannel?.send({
      step_num: 1,
    });
  };

  return (
    <Grid container>
      <Typography>{lobbyCode}</Typography>
      <Typography>{test}</Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to={`/quests/${questId}/active`}
      >
        Start Quest
      </Button>
      <Button variant="contained" color="primary" onClick={testClick}>
        Test
      </Button>
    </Grid>
  );
};

export default QuestLobbyView;
