import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

export default class AddManagerForm extends Component {
  render() {
    return (
      <div>
        <h1>Add a New Manager</h1>
        <div>
          <form>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="first-name"
              label="First Name"
              name="first-name"
              autoComplete="first-name"
              margin="normal"
              autoFocus
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="last-name"
              label="Last Name"
              name="last-name"
              autoComplete="last-name"
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
              margin="normal"
              required
              fullWidth
              id="phone-number"
              label="Phone Numbder"
              name="phone-number"
              autoComplete="phone-number"
              type="number"
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
            <Link to="/property-dash">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              href="#"
            >
              Add Manager
            </Button>
            </Link>
            <Link to="/property-dash">
              <Button variant="contained" color="secondary" href="#">
                Cancel
              </Button>
            </Link>  
          </form>
        </div>
      </div>
    );
  }
}
