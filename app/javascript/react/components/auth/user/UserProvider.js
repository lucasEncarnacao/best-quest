import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const signIn = (name) => {
    setCurrentUser(name);
  };

  const signOut = () => {
    setCurrentUser("");
  };

  return (
    <UserContext.Provider value={{ currentUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
