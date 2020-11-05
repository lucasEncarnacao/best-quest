import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuestShowPage = (props) => {
  const [quest, setQuest] = useState({
    name: "",
    description: "",
  });
  const id = props.match.params.id;

  useEffect(() => {
    fetch(`/api/v1/quests/${id}`)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setQuest(body.quest);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  return (
    <div>
      <h1>{quest.name}</h1>
      <h2>{quest.description}</h2>

      <Link to={`/quests/${id}/active`}>
        <button>Start This Quest</button>
      </Link>
    </div>
  );
};

export default QuestShowPage;
