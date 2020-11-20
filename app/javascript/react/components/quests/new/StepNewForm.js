import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DropzoneContainer from "./DropzoneContainer";
import MapNewContainer from "../../maps/MapNewContainer";

const StepNewForm = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const passUpChange = (event) => {
    props.handleChange(
      props.stepNum - 1,
      [event.currentTarget.name], //pass as array of all names and values to update so
      [event.currentTarget.value] //handleChange can be reused for lat and lng
    );
  };

  const passUpMapChange = (lat, lng) => {
    props.handleChange(props.stepNum - 1, ["lat", "lng"], [lat, lng]);
  };

  const passUpFileUpload = (acceptedFiles) => {
    props.handleChange(props.stepNum - 1, ["photo"], [acceptedFiles[0]]);
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">
          Location {props.stepNum}: {props.stepFields?.answer}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <form autoComplete="off" style={{ width: "100%" }}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                fullWidth
                label="Answer"
                name="answer"
                helperText="Name describing clue location answer"
                onChange={passUpChange}
                value={props.stepFields?.answer}
              />
            </Grid>

            <Grid item>
              <MapNewContainer handleChange={passUpMapChange} />
            </Grid>

            <Grid item>
              <Typography>Photo</Typography>
              <DropzoneContainer
                passUpFileUpload={passUpFileUpload}
                photo={props.stepFields?.photo}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Clue"
                name="clue"
                helperText="Clue that leads the player to the location"
                onChange={passUpChange}
                value={props.stepFields?.clue}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Hint"
                name="hint"
                helperText="Helpful hint if players get stuck"
                onChange={passUpChange}
                value={props.stepFields?.hint}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Answer Description"
                name="description"
                helperText="Insightful description of the answer location"
                onChange={passUpChange}
                value={props.stepFields?.description}
              />
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default StepNewForm;
