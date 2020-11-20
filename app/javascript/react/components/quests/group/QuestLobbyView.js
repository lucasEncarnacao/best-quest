import React, { useEffect } from "react";
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "68vh",
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.dark.contrastText,
  },
  regFont: {
    fontFamily: "Dosis, sans-serif",
  },
}));

const QuestLobbyView = (props) => {
  const classes = useStyles();
  const { lobbyId, lobbyCode } = props;

  useEffect(() => {
    props.setUpLobbyChannel(lobbyId);
  }, []);

  const startClick = () => {
    props.startQuest();
  };

  return (
    <Box className={classes.page} p={15} pt={20}>
      <Typography variant="h3">Lobby Code: {lobbyCode}</Typography>
      <Typography className={classes.regFont} variant="h5">
        Share this code with your friends before starting!
      </Typography>
      <Card>
        <Box p={4}>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={startClick}
              >
                Start Quest
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default QuestLobbyView;
