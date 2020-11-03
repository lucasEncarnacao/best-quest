import React, { useEffect, useState } from "react";
import QuestIndexTile from "./QuestIndexTile";

const QuestsContainer = (props) => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/quests/`)
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
      .then((quests) => {
        setQuests(quests);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const questList = quests.map((quest) => {
    return <QuestIndexTile key={quest.id} quest={quest} />;
  });

  return <div>{questList}</div>;
};

export default QuestsContainer;
