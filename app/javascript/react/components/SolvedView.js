import React from "react";

const SolvedView = (props) => {
  return (
    <div>
      <h1>Congrats!</h1>
      <h2>{props.description}</h2>
      <button onClick={props.nextClueClick}>Next Clue</button>
    </div>
  );
};

export default SolvedView;
