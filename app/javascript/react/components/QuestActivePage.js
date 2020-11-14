import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import HintSection from "./HintSection";
import SolvingView from "./SolvingView";
import SolvedView from "./SolvedView";
import QuestCompleteView from "./QuestCompleteView";
import QuestGroupView from "./QuestGroupView";
import UserContext from "./UserContext";

const QuestActivePage = (props) => {
  const { currentUser } = useContext(UserContext);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [shouldShowHintSection, setShouldShowHintSection] = useState(false);
  const [solving, setSolving] = useState(true); //solving current step
  const [completed, setCompleted] = useState(false); //completed quest
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //check loc button load
  const [badLocCounter, setBadLocCounter] = useState(0); //controls showing give up button
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [completionTimeId, setCompletionTimeId] = useState(0);
  const [completionTime, setCompletionTime] = useState("");
  const [shouldShowGroupView, setShouldShowGroupView] = useState(
    props.location?.state?.group
  );
  const questId = props.match.params.id;
  let view = null;
  let hintSection = null;

  if (currentUser === "") {
    return <Redirect to="/users/sign_in" />;
  }

  useEffect(() => {
    fetch(`/api/v1/quests/${questId}/steps`)
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
        setSteps(body.steps);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));

    //start quest timer
    const userToken = localStorage.getItem("userToken");
    fetch(`/api/v1/quests/${questId}/completion_times`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
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
      .then((completionTimeId) => {
        setCompletionTimeId(completionTimeId);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const pingLobby = (extraPayload) => {
    let nextStepNum = currentStepIndex + 1 + 1;
    App.LobbyChannel?.send({
      step_num: nextStepNum,
      ...extraPayload,
    });
  };

  const handleSuccess = (position) => {
    const locationPayload = {
      quest_id: questId,
      step_num: currentStepIndex + 1,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    fetch("/api/v1/check_locs", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(locationPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
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
      .then((locIsValid) => {
        if (locIsValid) {
          setSolving(false);
          pingLobby();
        } else {
          setShouldShowHintSection(true);
          setError("Sorry, keep looking!");
          setBadLocCounter(badLocCounter + 1);
        }
        setLoading(false);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const handleError = (error) => {
    setError(error.message);
  };

  const checkLocation = () => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
    });

    setLoading(true);
    setError("");
  };

  const nextClueClick = () => {
    if (currentStepIndex === steps.length - 1) {
      setCompleted(true);

      //end timer
      fetch(`/api/v1/completion_times/${completionTimeId}`, {
        credentials: "same-origin",
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
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
          setCompletionTime(body.completion_time.formatted_str);
        })
        .catch((error) => console.error(`Error in fetch: ${error.message}`));
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
      setShouldShowHintSection(false);
      setSolving(true);
      setError("");
      setBadLocCounter(0);
    }
  };

  const giveUpClick = () => {
    setSolving(false);
    pingLobby();
  };

  const addNewReview = (formPayload) => {
    const userToken = localStorage.getItem("userToken");
    fetch(`/api/v1/quests/${questId}/reviews`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
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
      .then((review) => {
        setShouldRedirect(true);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const handleResponse = (data) => {
    if (data.start) {
      //just starting quest
      setShouldShowGroupView(false);
    } else {
      if (data.completed) {
        setCompleted(true);
      } else {
        setSolving(false);
      }
    }
  };

  const setUpLobbyChannel = (lobbyId) => {
    App.LobbyChannel = App.cable.subscriptions.create(
      {
        channel: "LobbyChannel",
        lobby_id: lobbyId,
      },
      {
        connected: () =>
          console.log(`LobbyChannel "lobby_${lobbyId}" connected`),
        disconnected: () => console.log("LobbyChannel disconnected"),
        received: (data) => handleResponse(data),
      }
    );
  };

  const startQuest = () => {
    setShouldShowGroupView(false);

    pingLobby({ start: true });
  };

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  if (shouldShowHintSection) {
    hintSection = <HintSection hint={steps[currentStepIndex].hint} />;
  } else {
    hintSection = null;
  }

  if (solving) {
    view = (
      <SolvingView
        clue={steps[currentStepIndex]?.clue}
        error={error}
        loading={loading}
        badLocCounter={badLocCounter}
        giveUpClick={giveUpClick}
        checkLocation={checkLocation}
        hintSection={hintSection}
      />
    );
  } else {
    view = (
      <SolvedView
        description={steps[currentStepIndex]?.description}
        nextClueClick={nextClueClick}
        photo={steps[currentStepIndex]?.photo?.url}
        stepLat={steps[currentStepIndex]?.lat}
        stepLng={steps[currentStepIndex]?.lng}
      />
    );
  }

  if (completed) {
    view = (
      <QuestCompleteView
        addNewReview={addNewReview}
        completionTime={completionTime}
      />
    );
  }

  if (shouldShowGroupView) {
    view = (
      <QuestGroupView
        questId={questId}
        setUpLobbyChannel={setUpLobbyChannel}
        startQuest={startQuest}
      />
    );
  }

  return view;
};

export default QuestActivePage;
