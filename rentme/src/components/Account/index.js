import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import { compose } from "recompose";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import "./index.css"

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";


const LOG_IN_METHODS = [
  {
    id: "password",
    provider: null
  },
  {
    id: "google.com",
    provider: "googleProvider"
  },
  {
    id: "facebook.com",
    provider: "facebookProvider"
  }
];

const backButton = {
  marginTop: "20px",
  marginLeft: "3%",
  "&:hover": {
    cursor: "pointer",
    color: "#008c3a",
    backgroundColor: "transparent"
  }
}

const divStyle = {
  display: "flex",
  alignItems: "center"
}

const formCard = {
  margin: "0 auto",
  width: "70%",
  marginTop: "2rem",
  padding: "1.5rem"
}

const Account = ({ lastLocation }) => (
  <>
    {lastLocation && <Link to={lastLocation || "/"}>
      <Button style={backButton}>
        <Icon fontSize="small">arrow_back_ios</Icon>
        PREVIOUS PAGE
      </Button>
    </Link>}
    <Paper style={formCard}>
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <div style={divStyle} id="accountInfoHoalder">
              <h1 id="profileTital">Account: </h1>
              &nbsp;
        <h2 id="userAccountEmail"> &nbsp;{authUser.email}</h2>
            </div>
            {/* <PasswordChangeForm /> */}
            <LoginManagement authUser={authUser} />
          </>
        )}
      </AuthUserContext.Consumer>
    </Paper>
  </>
);

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    //fetches all the methods an email has been used to sign in
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  render() {

    const { activeSignInMethods, error } = this.state;

    const signInDiv = {
      display: "flex"
    }

    return (
      <>
        <div style={signInDiv} id="contentMediaQuery">
          <h3>Link Your Sign In Methods: </h3>
          <ul id="inputBoxes">
            {LOG_IN_METHODS.map(signInMethod => {
              const oneLeft = activeSignInMethods.length === 1; //avoids getting locked out - only one active method = disable all deactivation buttons
              const isEnabled = activeSignInMethods.includes(signInMethod.id);

              return (
                <li key={signInMethod.id} style={{ listStyleType: "none" }}>
                  {signInMethod.id === "password" ? (
                    <DefaultLoginToggle
                      oneLeft={oneLeft}
                      isEnabled={isEnabled}
                      signInMethod={signInMethod}
                      onLink={this.onUnlink}
                      onUnlink={this.onUnlink}
                    />
                  ) : (
                      <SocialLoginToggle
                        oneLeft={oneLeft}
                        isEnabled={isEnabled}
                        signInMethod={signInMethod}
                        onLink={this.onSocialLoginLink}
                        onUnlink={this.onUnlink}
                      />
                    )}
                </li>
              );
            })}
          </ul>
          {error && error.message}
        </div>
      </>
    );
  }
}

const socialButton = {
  display: "flex",
  marginBottom: "8px",
  justifyContent: "space-around"
}

const SocialLoginToggle = ({
  oneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) =>
  isEnabled ? (
    <Button
      style={socialButton}
      type="button"
      size="medium"
      variant="contained"
      color="primary"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={oneLeft}
    >
      Deactivate {signInMethod.id}
    </Button>
  ) : (
      <Button
        style={socialButton}
        type="button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={() => onLink(signInMethod.provider)}>
        Link {signInMethod.id}
      </Button>
    );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: "", passwordTwo: "" };
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: "", passwordTwo: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { oneLeft, isEnabled, signInMethod, onUnlink } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    const textField = {
      width: "300px",
      marginRight: "10px"
    }

    const buttonStyle = {
      width: "300px",
      marginRight: "10px",
      height: "36.5px",
      alignItems: "center",
      marginTop: "10px"
    }

    const form = {
      display: "flex",
      flexFlow: "column",
      marginBottom: "50px",
      justifyContent: "center"
    }

    const socialButton = {
      display: "flex",
      marginBottom: "8px",
      justifyContent: "space-around"
    }

    return isEnabled ? (
      <Button
        style={socialButton}
        type="button"
        variant="contained"
        color="primary"
        size="medium"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={oneLeft}
        className="textFields"
      >
        Deactivate {signInMethod.id}
      </Button>
    ) : (
        <form onSubmit={this.onSubmit} style={form}>
          <TextField
            style={textField}
            variant="outlined"
            margin="normal"
            autoFocus
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            label="New Password"
            className="textFields"
          />
          <TextField
            style={textField}
            variant="outlined"
            margin="normal"
            autoFocus
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            label="Confirm New Password"
            className="textFields"
          />
          <Button
            disabled={isInvalid}
            style={buttonStyle}
            type="submit"
            size="medium"
            variant="contained"
            color="primary"
            className="textFields"
          >
            Link {signInMethod.id}
          </Button>
        </form>
      );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
  withLastLocation,
  withAuthorization(condition)
)(Account);
