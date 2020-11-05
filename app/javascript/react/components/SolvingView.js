import React from "react";

const SolvingView = (props) => {
  let errorMessage = null;
  let giveUpButton = null;

  if (props.error !== "") {
    errorMessage = <h3>{props.error}</h3>;
  }

  if (props.badLocCounter >= 3) {
    giveUpButton = <button onClick={props.giveUpClick}>Give up</button>;
  }

  return (
    <div>
      <h1>Clue: {props.clue}</h1>
      {props.hintSection}
      <button onClick={props.checkLocation}>Check Location</button>
      {errorMessage}
      {giveUpButton}
    </div>
  );
};

export default SolvingView;
