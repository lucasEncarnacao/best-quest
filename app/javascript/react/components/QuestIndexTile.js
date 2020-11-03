import React from "react";
import { Link } from "react-router-dom";

const QuestIndexTile = (props) => {
  return (
    <div>
      <Link to={`/quests/${props.quest.id}`}>
        <h1>{props.quest.name}</h1>
        <h2>{props.quest.category}</h2>
      </Link>
    </div>
  );
};

export default QuestIndexTile;
