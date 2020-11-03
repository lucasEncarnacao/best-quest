import React from "react";

const QuestIndexTile = (props) => {
  return (
    <div>
      <h1>{props.quest.name}</h1>
      <h2>{props.quest.category}</h2>
    </div>
  );
};

export default QuestIndexTile;
