import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import QuestLobbyView from "./QuestLobbyView";

const QuestGroupPage = (props) => {
  const [shouldShowLobby, setShouldShowLobby] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [lobbyId, setLobbyId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const questId = props.match.params.id;

  const createLobbyClick = (event) => {
    fetch(`/api/v1/quests/${questId}/lobbies`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
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
        if (body.lobby) {
          setLobbyCode(body.lobby.code);
          setLobbyId(body.lobby.id);
          setShouldShowLobby(true);
        } else if (body.error) {
          setErrorMessage(body.error);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const joinLobbyClick = (event) => {
    //get lobby id from backend if exists
    //else print error saying room cant be found
  };

  if (shouldShowLobby) {
    return (
      <QuestLobbyView
        questId={questId}
        lobbyId={lobbyId}
        lobbyCode={lobbyCode}
      />
    );
  }

  return (
    <Grid container>
      <Typography>Hello</Typography>
      <Button variant="contained" color="primary" onClick={createLobbyClick}>
        Create Lobby
      </Button>
      <Button variant="contained" color="primary">
        Join Lobby
      </Button>
      <Typography>{errorMessage}</Typography>
    </Grid>
  );
};

export default QuestGroupPage;
