import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import QuestsContainer from "./QuestsContainer";
import UserContext from "./UserContext";

const QuestsIndexPage = (props) => {
  const { currentUser } = useContext(UserContext);

  App.LobbyChannel?.unsubscribe();
  App.cable?.disconnect();

  if (currentUser === "") {
    return <Redirect to="/users/sign_in" />;
  }

  return <QuestsContainer />;
};

export default QuestsIndexPage;
