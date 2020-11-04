import React from "react";
import MapContainer from "./MapContainer";

const StepNewForm = (props) => {
  const passUpChange = (event) => {
    //pass as array of all names and values to update so
    //handleChange can be reused for lat and lng
    props.handleChange(
      props.stepNum - 1,
      [event.currentTarget.name],
      [event.currentTarget.value]
    );
  };

  const passUpMapChange = (lat, lng) => {
    props.handleChange(props.stepNum - 1, ["lat", "lng"], [lat, lng]);
  };

  return (
    <div>
      <MapContainer handleChange={passUpMapChange} />
      <form>
        <div>
          <label htmlFor="clue">Clue:</label>
          <input
            type="text"
            id="clue"
            name="clue"
            onChange={passUpChange}
            value={props.stepFields?.clue}
          />
        </div>

        <div>
          <label htmlFor="hint">Hint:</label>
          <input
            type="text"
            id="hint"
            name="hint"
            onChange={passUpChange}
            value={props.stepFields?.hint}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={passUpChange}
            value={props.stepFields?.description}
          />
        </div>
      </form>
    </div>
  );
};

export default StepNewForm;
