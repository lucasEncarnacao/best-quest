import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import QuestNewForm from "./QuestNewForm";
import StepNewForm from "./StepNewForm";

const QuestNewPage = (props) => {
  const [questFields, setQuestFields] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [stepsFields, setStepsFields] = useState([
    {
      lat: "",
      lng: "",
      clue: "",
      hint: "",
      description: "",
    },
  ]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState("");
  let stepForms = null;
  let errorsDiv = null;

  const handleChange = (event) => {
    setQuestFields({
      ...questFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleStepChange = (index, names, values) => {
    let updatedStepsArray = [...stepsFields];
    let updatedStep = stepsFields[index];

    names.forEach((name, i) => {
      updatedStep = {
        ...updatedStep,
        [name]: values[i],
      };
    });

    updatedStepsArray.splice(index, 1, updatedStep);
    setStepsFields(updatedStepsArray);
  };

  const handleSubmit = () => {
    let formPayLoad = { quest: questFields, steps: stepsFields };

    fetch("/api/v1/quests", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayLoad),
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
        if (body.quest) {
          setShouldRedirect(true);
        } else if (body.errors) {
          setErrors(body.errors);
        } else {
          console.error("ERROR: Unexpected server response");
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const addStep = () => {
    const newStepField = {
      lat: "",
      lng: "",
      clue: "",
      hint: "",
      description: "",
    };

    setStepsFields([...stepsFields, newStepField]);
  };

  stepForms = stepsFields.map((stepFields, index) => {
    return (
      <StepNewForm
        key={index}
        stepNum={index + 1}
        handleChange={handleStepChange}
        stepFields={stepFields}
      />
    );
  });

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  if (errors !== "") {
    errorsDiv = <div>{errors}</div>;
  }

  return (
    <div>
      <h1>New Quest</h1>
      {errorsDiv}
      <QuestNewForm
        handleChange={handleChange}
        questFields={props.questFields}
      />
      {stepForms}
      <button onClick={addStep}>Add step</button>
      <button onClick={handleSubmit}>Create Quest</button>
    </div>
  );
};

export default QuestNewPage;
