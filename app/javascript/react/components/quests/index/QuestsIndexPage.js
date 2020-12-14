import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import QuestsContainer from "./QuestsContainer";
import UserContext from "../../auth/user/UserContext";

const QuestsIndexPage = (props) => {
  const { currentUser, checkedAutoSignIn } = useContext(UserContext);
  const [authorized, setAuthorized] = useState(true);

  App.LobbyChannel?.unsubscribe();
  App.cable?.disconnect();

  useEffect(() => {
    if (checkedAutoSignIn && currentUser === "") {
      setAuthorized(false);
    }
  }, [checkedAutoSignIn, currentUser]);

  if (!authorized) {
    return <Redirect to="/users/sign_in" />;
  }

  return <QuestsContainer />;
};

export default QuestsIndexPage;
