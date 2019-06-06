import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

export default class PropertyOwnerSignup extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up as a Property Owner</h1>
        <div>
          <form>
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
        </div>
      </div>
    );
  }
}
