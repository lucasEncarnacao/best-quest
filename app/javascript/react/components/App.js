import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./Layout";

export const App = (props) => {
  return (
    <BrowserRouter>
      <Route path="/" component={Layout} />
    </BrowserRouter>
  );
};

export default App;
