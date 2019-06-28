import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import axios from "axios";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const PropertyOwnerSignUp = props => (
  <Container className={props.classes.pageContainer}>
    <h4>Sign Up as a Property Owner</h4>
    <OwnerSignUpForm />
  </Container>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isOwner: false,
  error: null
};

const styles = {
  pageContainer: {
    textAlign: "center"
  }
};

class OwnerSignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

onSubmitAddOwner = async e => {
  e.preventDefault();

  const { authUser, username, email, passwordOne, isOwner } = this.state;
  const roles = {};

  if (isOwner) {
    roles[ROLES.OWNER] = ROLES.OWNER;
  }

  try {
    const authUser = await this.props.firebase.doCreateUserWithEmailAndPassword(
      email,
      passwordOne
    );

  await this.props.firebase.user(authUser.user.uid).set({
    username,
    email,
    roles
  });

  const response = await axios.post('https://rent-me-app.herokuapp.com/api/user', {
    uid: authUser.user.uid,
    email,
    role: ROLES.OWNER
  });
} catch (err) {
  alert(err)
} finally {
    return this.props.history.push(ROUTES.OWNER_DASHBOARD);
  };
}
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckbox = e => {
    this.setState({ [e.target.name]: e.target.checked })
  }

  render() {
    const { email, username, passwordOne, passwordTwo, isOwner, error } = this.state;

    const isInvalid =
      email === "" ||
      username === "" ||
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      isOwner === false;

      const formContainer = {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        padding: "2rem"
      };

      const buttons = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "75%",
        margin: "1rem auto"
      };

    const button = {
      width: "40%"
    };

    return (
      <>
        <form onSubmit={this.onSubmitAddOwner}>
          <Container style={formContainer}>
            <TextField
              variant="outlined"
              type="text"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              margin="normal"
              value={username}
              onChange={this.onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              type="text"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              margin="normal"
              value={email}
              onChange={this.onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              type="password"
              required
              fullWidth
              id="password"
              label="Password"
              name="passwordOne"
              margin="normal"
              value={passwordOne}
              onChange={this.onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              type="password"
              required
              fullWidth
              id="confirm-password"
              label="Confirm Password"
              name="passwordTwo"
              margin="normal"
              value={passwordTwo}
              onChange={this.onChange}
              autoFocus
            />
            {/* <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
          />
         <input
            type="password"
            placeholder="Confirm Password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
          /> */}

          <label>
            I confirm I am signing up as a Property Owner:
            <input
              name="isOwner"
              type="checkbox"
              checked={isOwner}
              onChange={this.onChangeCheckbox}
              />
          </label>

            <div style={buttons}>
              <Button
                disabled={isInvalid}
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                style={button}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                color="secondary"
                href="/"
                size="large"
                style={button}
              >
                Cancel
              </Button>
            </div>
            {error && <p>{error.message}</p>}
          </Container>
        </form>
      </>
    );
  }
}

const OwnerSignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.OWNER_SIGNUP}>Sign Up</Link>
  </p>
);

const OwnerSignUpForm = compose(
  withRouter,
  withFirebase
)(OwnerSignUpFormBase);

export default withStyles(styles)(PropertyOwnerSignUp);

export { OwnerSignUpForm, OwnerSignUpLink };
