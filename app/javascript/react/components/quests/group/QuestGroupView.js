import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QuestLobbyView from "./QuestLobbyView";
import FetchHelper from "../../../helpers/FetchHelper";

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
    FetchHelper.post(`/api/v1/quests/${questId}/lobbies`, null).then((body) => {
      if (body.lobby) {
        setLobbyCode(body.lobby.code);
        setLobbyId(body.lobby.id);
        setShouldShowLobby(true);
      } else if (body.error) {
        setErrorMessage(body.error);
      }
    });
  };

  const joinLobbySubmit = (event) => {
    event.preventDefault();

    let sendCode = formCode === "" ? "xxx" : formCode;

    FetchHelper.get(`/api/v1/lobbies/${sendCode}`).then((body) => {
      if (body.lobby) {
        setLobbyCode(body.lobby.code);
        setLobbyId(body.lobby.id);
        setShouldShowLobby(true);
      } else if (body.error) {
        setErrorMessage(body.error);
      }
    });
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
