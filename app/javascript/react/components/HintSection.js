import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";

const HintSection = (props) => {
  const [show, setShow] = useState(false);
  let hintSection = null;

  const showHint = () => {
    setShow(true);
  };

  if (show) {
    hintSection = <Typography variant="h5">Hint: {props.hint}</Typography>;
  } else {
    hintSection = (
      <Button variant="contained" color="secondary" onClick={showHint}>
        Hint
      </Button>
    );
  }

  return hintSection;
};

export default HintSection;
