import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from '../constants/routes';

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";


const RenterSignUp = () => (
  <>
    <h4>Sign Up as a Renter</h4>
    <RenterSignUpForm />
  </>
)


class RenterSignUpForm extends Component {
  constructor(props) {
    super(props)
  }

  onSubmit = e => {

  }

  onChange = e => {

  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="full-name"
            label="Full Name"
            name="full-name"
            autoComplete="full-name"
            margin="normal"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
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
            fullWidth
            variant="contained"
            color="primary"
            href="/"
          >
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" href="/">
            Cancel
          </Button>
        </form>
      </>
    );
  }
}


const RenterSignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.RENTER_SIGNUP}>Sign Up</Link>
  </p>
)

export default RenterSignUp

export { RenterSignUpForm, RenterSignUpLink }
