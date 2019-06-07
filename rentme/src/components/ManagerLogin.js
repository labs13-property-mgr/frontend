import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const ManagerLogin = props => {
  return (
    <>
      <div>
        <h1>Manager Sign In</h1>
        <form>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            margin="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            size="medium"
            variant="contained"
            color="primary"
            href="/manager-dash"
          >
            Login
          </Button>
          <Button variant="contained" color="secondary" size="medium" href="/">
            Go Back
          </Button>
        </form>
      </div>
    </>
  );
};

export default ManagerLogin;
