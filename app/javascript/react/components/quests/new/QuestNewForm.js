import React from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";

const QuestNewForm = (props) => {
  return (
    <form autoComplete="off">
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField
            fullWidth
            label="Quest Name"
            name="name"
            onChange={props.handleChange}
            value={props.questFields?.name}
          />
        </Grid>

        <Grid item>
          <TextField
            select
            fullWidth
            label="Quest Category"
            name="category"
            onChange={props.handleChange}
            value={props.questFields?.category}
          >
            <MenuItem value="art">Art</MenuItem>
            <MenuItem value="history">History</MenuItem>
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="misc">Misc</MenuItem>
          </TextField>
        </Grid>

        <Grid item>
          <TextField
            fullWidth
            multiline
            rowsMax={3}
            label="Quest Description"
            name="description"
            onChange={props.handleChange}
            value={props.questFields?.description}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default QuestNewForm;
