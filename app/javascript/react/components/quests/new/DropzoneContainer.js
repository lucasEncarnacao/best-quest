import React from "react";
import Dropzone from "react-dropzone";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
  },
}));

const DropzoneContainer = (props) => {
  const classes = useStyles();
  let uploadedPhotoText = null;

  if (props.photo !== "") {
    uploadedPhotoText = `${props.photo?.path}`;
  } else {
    uploadedPhotoText = "None";
  }

  return (
    <Grid container alignItems="flex-end">
      <Grid item xs className={classes.container}>
        <Dropzone onDrop={props.passUpFileUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Box p={2}>
                  <Typography variant="h6">
                    Click or drag 'n' drop here to upload a photo
                  </Typography>
                  <Typography>Selected: {uploadedPhotoText}</Typography>
                </Box>
              </div>
            </section>
          )}
        </Dropzone>
      </Grid>
    </Grid>
  );
};

export default DropzoneContainer;
