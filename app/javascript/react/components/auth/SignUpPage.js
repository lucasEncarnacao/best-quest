import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Box, Button, Link, TextField, Typography } from "@material-ui/core";
import UserContext from "./user/UserContext";
import FetchHelper from "../../helpers/FetchHelper";

const SignUpPage = (props) => {
  const { signIn } = useContext(UserContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState("");
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
    setErrors("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayload = { user: { ...formFields } };

    FetchHelper.post(`/api/v1/users`, formPayload).then((body) => {
      if (body.username) {
        localStorage.setItem("userToken", body.jwt_token);
        signIn(body.username);
        setShouldRedirect(true);
      } else if (body.errors) {
        setErrors(body.errors);
      }
    });
  };

  if (shouldRedirect) {
    return <Redirect to="/quests" />;
  }

  return (
    <Box p={10} pt={6}>
      <Typography variant="h3">Sign Up</Typography>
      <Typography color="error">{errors}</Typography>

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
            Sign Up
          </Button>
        </Box>
      </form>

      <Typography>
        <Link href="/users/sign_in">Already have an account? Sign In</Link>
      </Typography>
    </Box>
  );
};

export default SignUpPage;
