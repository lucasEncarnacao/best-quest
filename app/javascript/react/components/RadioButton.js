import React from "react";

const RadioButton = (props) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value={props.value}
          name={props.name}
          onChange={props.handleFieldChange}
          checked={props.state === props.value}
        />
        <h5>{props.value}</h5>
      </label>
    </div>
  );
};

export default RadioButton;
