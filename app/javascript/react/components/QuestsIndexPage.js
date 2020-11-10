import React from "react";
import QuestsContainer from "./QuestsContainer";

const QuestsIndexPage = (props) => {
  App.LobbyChannel?.unsubscribe();
  App.cable?.disconnect();

  return <QuestsContainer />;
};

export default QuestsIndexPage;
