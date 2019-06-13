import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import GoogleButton from "react-google-button";
import { FacebookLoginButton } from "react-social-login-buttons";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Button from "@material-ui/core/Button";
import { ForgotPasswordLink } from "../PasswordForget";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import "./login.css";

const styles = {
  container: {
    position: "relative",
    zIndex: "1",
    width: "100%"
  },
  halfSide: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem",
    boxShadow: "2px 2px 8px rgba(67, 67, 67, 0.4)"
  },
  paper: {
    padding: "2.5rem"
  },
  loginLayout: {
    display: "flex",
    flexDirection: "row",
    marginTop: "3rem"
  },
  socialLogins: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  emailPassword: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

const Login = props => (
  <div className="login-container">
    <div className="main-container" />
    <Container className={props.classes.container}>
      <div className={props.classes.loginLayout}>
        <Grid className={props.classes.halfSide} item md={6}>
          <Paper className={props.classes.paper}>
            <div className={props.classes.socialLogins}>
              <SignInGoogle />
              <SignInFacebook />
              <p>or</p>
            </div>
            <hr />
            <div className={props.classes.emailPassword}>
              <p>Login via Email & Password</p>
              <RenterLoginForm />
            </div>
          </Paper>
        </Grid>
        <Grid className={props.classes.halfSide} item md={6}>
          <Paper className={props.classes.paper}>
            <div className={props.classes.socialLogins}>
              <OwnerSignInGoogle />
              <OwnerSignInFacebook />
              <p>or</p>
            </div>
            <hr />
            <div className={props.classes.emailPassword}>
              <p>Login via Email & Password</p>
              <OwnerLoginForm />
            </div>
          </Paper>
        </Grid>
      </div>
    </Container>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class RenterLoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = e => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.TENANT_DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    const formStyle = {
      display: "flex",
      flexDirection: "column"
    };

    const textField = {
      width: "300px"
    };

    const forgotPassSignup = {
      textAlign: "center"
    };

    return (
      <form onSubmit={this.onSubmit} style={formStyle}>
        <TextField
          style={textField}
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
        {/* <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={this.onChange}
        /> */}
        <TextField
          style={textField}
          variant="outlined"
          type="password"
          required
          id="password"
          label="Password"
          name="password"
          margin="normal"
          value={password}
          onChange={this.onChange}
          autoFocus
        />
        {/* <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
        /> */}
        <Button
          disabled={isInvalid}
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
        >
          Login as a Renter
        </Button>
        {error && <p>{error.message}</p>}
        <div style={forgotPassSignup}>
          <div>
            <ForgotPasswordLink />
          </div>
          <div>
            Don't have an account?{" "}
            <Button color="secondary" href="/renter-signup">
              Signup
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.TENANT_DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { error } = this.state;

    const buttonStyle = {
      border: "none",
      backgroundColor: "white",
      "&:focus": {
        outline: "none",
        border: "none"
      },
      "&:active": {
        outline: "none",
        border: "none"
      }
    };

    return (
      <form onSubmit={this.onSubmit}>
        <button style={buttonStyle} type="submit">
          <GoogleButton
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.TENANT_DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { error } = this.state;

    const buttonStyle = {
      border: "none",
      backgroundColor: "white",
      "&:focus": {
        outline: "none",
        border: "none"
      },
      "&:active": {
        outline: "none",
        border: "none"
      }
    };

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" style={buttonStyle} type="submit">
          <FacebookLoginButton
            onClick={() => console.log("Facebook button clicked")}
          >
            <span>Sign In with Facebook</span>
          </FacebookLoginButton>
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class OwnerLoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = e => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.OWNER_DASHBOARD);
        console.log("right here");
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    const formStyle = {
      display: "flex",
      flexDirection: "column"
    };

    const textField = {
      width: "300px"
    };

    const forgotPassSignup = {
      textAlign: "center"
    };

    return (
      <form onSubmit={this.onSubmit} style={formStyle}>
        <TextField
          style={textField}
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
        {/* <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={this.onChange}
        /> */}
        <TextField
          style={textField}
          variant="outlined"
          type="password"
          required
          id="password"
          label="Password"
          name="password"
          margin="normal"
          value={password}
          onChange={this.onChange}
          autoFocus
        />
        {/* <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
        /> */}
        <Button
          disabled={isInvalid}
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
        >
          Login as a Property Owner
        </Button>
        {error && <p>{error.message}</p>}
        <div style={forgotPassSignup}>
          <div>
            <ForgotPasswordLink />
          </div>
          <div>
            Don't have an account?{" "}
            <Button color="secondary" href="/owner-signup">
              Signup
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

class OwnerSignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.OWNER_DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { error } = this.state;
    const buttonStyle = {
      border: "none",
      backgroundColor: "white",
      "&:focus": {
        outline: "none",
        border: "none"
      },
      "&:active": {
        outline: "none",
        border: "none"
      }
    };

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" style={buttonStyle}>
          <GoogleButton
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class OwnerSignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.OWNER_DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    e.preventDefault();
  };

  render() {
    const { error } = this.state;

    const buttonStyle = {
      border: "none",
      backgroundColor: "white",
      "&:focus": {
        outline: "none",
        border: "none"
      },
      "&:active": {
        outline: "none",
        border: "none"
      }
    };

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" style={buttonStyle}>
          <FacebookLoginButton
            onClick={() => console.log("Facebook button clicked")}
          >
            <span>Sign In with Facebook</span>
          </FacebookLoginButton>
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const RenterLoginForm = compose(
  withRouter,
  withFirebase
)(RenterLoginFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);

const OwnerLoginForm = compose(
  withRouter,
  withFirebase
)(OwnerLoginFormBase);

const OwnerSignInGoogle = compose(
  withRouter,
  withFirebase
)(OwnerSignInGoogleBase);

const OwnerSignInFacebook = compose(
  withRouter,
  withFirebase
)(OwnerSignInFacebookBase);

export default withStyles(styles)(Login);

export {
  RenterLoginForm,
  SignInGoogle,
  SignInFacebook,
  OwnerLoginForm,
  OwnerSignInGoogle,
  OwnerSignInFacebook
};
