import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import QuestLobbyView from "./QuestLobbyView";

const QuestGroupView = (props) => {
  const [shouldShowLobby, setShouldShowLobby] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [lobbyId, setLobbyId] = useState(0);
  const [formCode, setFormCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { questId } = props;

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

  const joinLobbySubmit = (event) => {
    event.preventDefault();

    fetch(`/api/v1/lobbies/${formCode}`, {
      credentials: "same-origin",
      method: "GET",
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

  const handleChange = (event) => {
    //only allow 4 char codes - no whitespace
    if (event.target.value.length <= 4) {
      setFormCode(event.target.value.trim().toUpperCase());
      setErrorMessage("");
    }
  };

  if (shouldShowLobby) {
    return (
      <QuestLobbyView
        lobbyId={lobbyId}
        lobbyCode={lobbyCode}
        setUpLobbyChannel={props.setUpLobbyChannel}
        startQuest={props.startQuest}
      />
    );
  }

  return (
    <Grid container>
      <Typography>Hello</Typography>
      <Button variant="contained" color="primary" onClick={createLobbyClick}>
        Create Lobby
      </Button>
      <form onSubmit={joinLobbySubmit} autoComplete="off">
        <TextField
          label="Lobby Code"
          onChange={handleChange}
          value={formCode}
        />
        <Button type="submit" variant="contained" color="primary">
          Join Lobby
        </Button>
      </form>
      <Typography>{errorMessage}</Typography>
    </Grid>
  );
};

export default QuestGroupView;
