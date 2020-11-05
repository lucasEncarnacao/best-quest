import React, { useState } from "react";

const HintSection = (props) => {
  const [show, setShow] = useState(false);
  let hintSection = null;

  const showHint = () => {
    setShow(true);
  };

  if (show) {
    hintSection = <h1>{props.hint}</h1>;
  } else {
    hintSection = <button onClick={showHint}>Hint</button>;
  }

  return <div>{hintSection}</div>;
};

export default HintSection;
