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
import MapContainer from "./MapContainer";

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

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Location {props.stepNum}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <form autoComplete="off" style={{ width: "100%" }}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <MapContainer handleChange={passUpMapChange} />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Clue"
                name="clue"
                helperText="Clue that leads the player to the location"
                onChange={passUpChange}
                value={props.questFields?.clue}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Hint"
                name="hint"
                helperText="Helpful hint if players get stuck"
                onChange={passUpChange}
                value={props.questFields?.hint}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Answer Description"
                name="description"
                helperText="Insightful description of the answer location"
                onChange={passUpChange}
                value={props.questFields?.description}
              />
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default StepNewForm;
