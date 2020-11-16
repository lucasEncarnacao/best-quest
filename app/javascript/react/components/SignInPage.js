import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Box, Button, Link, TextField, Typography } from "@material-ui/core";
import UserContext from "./UserContext";

const SignInPage = (props) => {
  const { signIn } = useContext(UserContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });
  const redirectUrl = props.location?.state?.url;

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayload = { user: { ...formFields } };

    fetch(`/api/v1/users/sign_in`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
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
        if (body.username) {
          localStorage.setItem("userToken", body.jwt_token);
          signIn(body.username);
          setShouldRedirect(true);
        } else if (body.error) {
          setError(body.error);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (shouldRedirect) {
    let url = redirectUrl === undefined ? "/quests" : redirectUrl;
    return <Redirect to={url} />;
  }

  return (
    <Box p={10} pt={6}>
      <Typography variant="h3">Sign In</Typography>
      <Typography color="error">{error}</Typography>

      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          fullWidth
          label="Username"
          name="username"
          onChange={handleChange}
          value={formFields.username}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={formFields.password}
        />
        <Box py={2}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Sign In
          </Button>
        </Box>
      </form>

      <Typography>
        <Link href="/users/sign_up">New User? Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default SignInPage;
