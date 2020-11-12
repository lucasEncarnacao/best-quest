import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const signIn = (name) => {
    setUsername(name);
  };

  const signOut = () => {
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ username, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
