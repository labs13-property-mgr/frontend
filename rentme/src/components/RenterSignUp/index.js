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
import Button from "@material-ui/core/Button";

const RenterSignUp = props => (
  <Container className={props.classes.pageContainer}>
    <h2>Signup as a Renter</h2>
    <RenterSignUpForm />
  </Container>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isTenant: false,
  error: null
};

const styles = {
  pageContainer: {
    textAlign: "center"
  }
};

class RenterSignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmitAddTenant = async e => {
    e.preventDefault();
  
    const { username, email, passwordOne, isTenant } = this.state;
    const roles = {};
  
    if (isTenant) {
      roles[ROLES.TENANT] = ROLES.TENANT;
    }
  
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

    console.log(response);
    return this.props.history.push(ROUTES.TENANT_DASHBOARD);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCheckbox = e => {
    this.setState({ [e.target.name]: e.target.checked })
  }

  render() {
    const { email, username, passwordOne, passwordTwo, isTenant, error } = this.state;

    const isInvalid =
      email === "" ||
      username === "" ||
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      isTenant === false;

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
        <form onSubmit={this.onSubmitAddTenant}>
          <Container style={formContainer}>
            <TextField
              variant="outlined"
              type="text"
              required
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
          /> */}
            {/* <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={this.onChange}
          /> */}
            {/* <input
            type="password"
            placeholder="Password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
          /> */}
            {/* <input
            type="password"
            placeholder="Confirm Password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
          /> */}

          <label>
            I confirm I am signing up as a Tenant:
            <input
              name="isTenant"
              type="checkbox"
              checked={isTenant}
              onChange={this.onChangeCheckbox}
              />
          </label>
          
            <div style={buttons}>
              <Button
                disabled={isInvalid}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={button}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/"
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

const RenterSignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.RENTER_SIGNUP}>Sign Up</Link>
  </p>
);

const RenterSignUpForm = compose(
  withRouter,
  withFirebase
)(RenterSignUpFormBase);

export default withStyles(styles)(RenterSignUp);

export { RenterSignUpForm, RenterSignUpLink };
