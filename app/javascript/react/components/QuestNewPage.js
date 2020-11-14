import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import QuestNewForm from "./QuestNewForm";
import StepNewForm from "./StepNewForm";
import UserContext from "./UserContext";

const QuestNewPage = (props) => {
  const { currentUser } = useContext(UserContext);
  const [questFields, setQuestFields] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [stepsFields, setStepsFields] = useState([
    {
      lat: "",
      lng: "",
      answer: "",
      clue: "",
      hint: "",
      description: "",
      photo: "",
    },
  ]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState("");
  let stepForms = null;
  let errorMessages = null;

  App.LobbyChannel?.unsubscribe();
  App.cable?.disconnect();

  const handleChange = (event) => {
    setQuestFields({
      ...questFields,
      [event.target.name]: event.target.value,
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

  const compileBody = () => {
    let body = new FormData();

    Object.keys(questFields).forEach((key) =>
      body.append(key, questFields[key])
    );

    stepsFields.forEach((step, index) => {
      Object.keys(step).forEach((key) =>
        body.append(`${key}_${index}`, step[key])
      );
    });

    return body;
  };

  const handleSubmit = () => {
    const userToken = localStorage.getItem("userToken");

    let body = compileBody();

    fetch("/api/v1/quests", {
      credentials: "same-origin",
      method: "POST",
      body: body,
      headers: {
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
      answer: "",
      clue: "",
      hint: "",
      description: "",
      photo: "",
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

  if (currentUser === "") {
    return <Redirect to="/users/sign_in" />;
  }

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  if (errors !== "") {
    errorMessages = (
      <Grid item>
        <Typography>{errors}</Typography>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h3">Create a Quest</Typography>
      </Grid>

      {errorMessages}

      <Grid item>
        <QuestNewForm handleChange={handleChange} questFields={questFields} />
      </Grid>

      <Grid item>{stepForms}</Grid>

      <Grid item>
        <Button variant="contained" color="secondary" onClick={addStep}>
          Add another location
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Quest
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuestNewPage;
