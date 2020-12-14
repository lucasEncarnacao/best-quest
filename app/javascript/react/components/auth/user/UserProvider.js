import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [checkedAutoSignIn, setCheckedAutoSignIn] = useState(false);

  const signIn = (name) => {
    setCurrentUser(name);
  };

  const signOut = () => {
    setCurrentUser("");
  };

  const updateAutoSignInCheck = (bool) => {
    setCheckedAutoSignIn(bool);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        checkedAutoSignIn,
        signIn,
        signOut,
        updateAutoSignInCheck,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
