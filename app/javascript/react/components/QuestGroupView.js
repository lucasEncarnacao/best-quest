import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import QuestLobbyView from "./QuestLobbyView";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "68vh",
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.dark.contrastText,
  },
}));

const QuestGroupView = (props) => {
  const classes = useStyles();
  const [shouldShowLobby, setShouldShowLobby] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const [lobbyId, setLobbyId] = useState(0);
  const [formCode, setFormCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { questId } = props;
  let lobbyCodeTextField = null;

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

    let sendCode = formCode === "" ? "xxx" : formCode;

    fetch(`/api/v1/lobbies/${sendCode}`, {
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

  if (errorMessage === "") {
    lobbyCodeTextField = (
      <TextField label="Lobby Code" onChange={handleChange} value={formCode} />
    );
  } else {
    lobbyCodeTextField = (
      <TextField
        error
        label="Lobby Code"
        onChange={handleChange}
        value={formCode}
        helperText={errorMessage}
      />
    );
  }

  return (
    <Box className={classes.page} p={15} pt={20}>
      <Typography variant="h6">Play with Friends!</Typography>
      <Card>
        <Box p={4} pt={8}>
          <Grid container justify="center" spacing={6}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={createLobbyClick}
              >
                Create Lobby
              </Button>
            </Grid>

            <Grid item>
              <form onSubmit={joinLobbySubmit} autoComplete="off">
                <Grid container justify="center">
                  <Box pb={4}>
                    <Grid item>{lobbyCodeTextField}</Grid>
                  </Box>

                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Join Lobby
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default QuestGroupView;
