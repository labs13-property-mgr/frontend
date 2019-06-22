import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import GoogleButton from "react-google-button";
import { FacebookLoginButton } from "react-social-login-buttons";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Button from "@material-ui/core/Button";
import { ForgotPasswordLink } from "../PasswordForget";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Background from "../img/login-background-image.png";
import "typeface-roboto";

const styles = theme => ({
  pageContainer: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      minHeight: 0
    }
  },

  introSection: {
    width: "50%",
    // boxShadow: "10px 10px 25px -8px rgba(15,15,15,1)",
    position: "relative",
    zIndex: 0,
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
      position: "relative"
    }
  },

  textBackground: {
    height: "100%",
    backgroundColor: "#008c3a",
    clipPath: "polygon(100% 0, 0 0, 0 100%, 31% 100%, 100% 50%)",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: -1,
    opacity: 0.6,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
      clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)"
    }
  },

  textBackgroundTwo: {
    height: "100%",
    backgroundColor: "#3f51b5;",
    clipPath: "polygon(0 49%, 100% 85%, 100% 100%, 0% 100%);",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: -1,
    opacity: 0.6,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%"
    }
  },

  introCopy: {
    position: "relative",
    zIndex: 1,
    paddingTop: "4rem",
    padding: "2rem",
    height: "100%"
  },

  copy: {
    fontSize: "2.5rem",
    marginBottom: "3rem",
    color: "white",
    textAlign: "center",
    lineHeight: 1,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
      position: "relative",
      zIndex: 1,
      marginBottom: "1.5rem"
    }
  },
  loginSignupSection: {
    width: "100%",
    minHeight: "100vh",
    minHeight: "100%",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    overflow: "hidden"
  },
  container: {
    position: "relative",
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem"
  },
  halfSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto",
    width: "100%"
  },
  paper: {
    padding: "2.5rem",
    borderRadius: "0",
    boxShadow: "box-shadow: 10px 10px 25px -8px rgba(15,15,15,1)"
  },
  loginLayout: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    width: "100%"
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
  },
  test: {
    // border: "1px solid black"
  },
  appBar: {
    marginBottom: "-.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    marginTop: "2rem",
    backgroundColor: "white",
    boxShadow: "none"
  },
  tabs: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    border: "none",
    boxShadow: "none",
    paddingTop: "2rem"
  },
  tab: {
    fontSize: "1.2rem",
    fontWeight: "bold"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#3F51B5" },
    secondary: {
      main: "#008c3a",
      light: "#33a361"
    }
  }
});

const ERROR_CODE_ACCOUNT_EXISTS = 'Account exists with different crentials'

const ERROR_MSG_ACCOUNT_EXISTS = `An account with an e-mail address to this social account already exists.
 Please login from this account instead and associate your social accounts on your Account Page`

const Login = props => {
  const [tab, setTabs] = React.useState(0);

  function handleChange(event, newTab) {
    setTabs(newTab);
  }
  return (
    <div className={props.classes.pageContainer}>
      <div className={props.classes.introSection}>
        <div className={props.classes.introCopy}>
          {/* <h2 className={props.classes.copy}>
            Seamless communication between owners and renters.
          </h2> */}
          <Typography className={props.classes.copy} variant="h2">
            Seamless <strong>communication.</strong>
          </Typography>
          <Typography className={props.classes.copy} variant="h2">
            Seamless <strong>property management.</strong>
          </Typography>
          <Typography className={props.classes.copy} variant="h2">
            Seamless <strong>document tracking.</strong>
          </Typography>
          {/* <Typography className={props.classes.copy} variant="h2">
            Made for <strong>Renters and Owners</strong>
          </Typography> */}
          <div className={props.classes.textBackground} />
          <div className={props.classes.textBackgroundTwo} />
        </div>
      </div>
      <main className={props.classes.loginSignupSection}>
        <Container className={props.classes.container}>
          <Grid container item lg={8}>
            <ThemeProvider theme={theme}>
              <AppBar position="static" className={props.classes.appBar}>
                <Tabs
                  value={tab}
                  onChange={handleChange}
                  className={props.classes.tabs}
                  indicatorColor="secondary"
                  textColor="secondary"
                  centered
                >
                  <Tab className={props.classes.tab} label="Renters" />
                  <Tab className={props.classes.tab} label="Owners" />
                </Tabs>
              </AppBar>
            </ThemeProvider>
          </Grid>
          <div className={props.classes.loginLayout}>
            <Grid container>
              {tab === 0 && (
                <>
                  <Grid className={props.classes.halfSide} item lg={8}>
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
                </>
              )}
              {tab === 1 && (
                <>
                  <Grid className={props.classes.halfSide} item lg={8}>
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
                </>
              )}
            </Grid>
          </div>
        </Container>
      </main>
    </div>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  isTenant: "",
  isOwner: "",
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
            <ThemeProvider theme={theme}>
              <Button color="secondary" href="/renter-signup">
                Signup
              </Button>
            </ThemeProvider>
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
    const {  isTenant } = this.state;
    const roles = {};

    roles[ROLES.TENANT] = ROLES.TENANT
    
    this.props.firebase
      .doSignInWithGoogle()
      .then(authUser => {
        return this.props.firebase               
        .user(authUser.user.uid)
        .set({
          roles,
        })
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.TENANT_DASHBOARD);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS){
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
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
    const {  isTenant } = this.state;
    const roles = {};

    roles[ROLES.TENANT] = ROLES.TENANT

    this.props.firebase
      .doSignInWithFacebook()
      .then(authUser => {
        return this.props.firebase               
        .user(authUser.user.uid)
        .set({
          roles,
        })
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.TENANT_DASHBOARD);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS){
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
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

    const buttonText = {
      fontSize: "16px",
      textAlign: "center"
    };

    const fbButton = {
      width: "220px",
      textAlign: "center"
    };

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" style={buttonStyle} type="submit">
          <FacebookLoginButton
            style={fbButton}
            onClick={() => console.log("Facebook button clicked")}
          >
            <span style={buttonText}>Sign In with Facebook</span>
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
            <ThemeProvider theme={theme}>
              <Button color="secondary" href="/owner-signup">
                Signup
              </Button>
            </ThemeProvider>
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
    const {  isOwner } = this.state;
    const roles = {};

    roles[ROLES.OWNER] = ROLES.OWNER

    this.props.firebase
      .doSignInWithGoogle()
      .then(authUser => {
        return this.props.firebase               
        .user(authUser.user.uid)
        .set({
          roles,
        })
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.OWNER_DASHBOARD);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS){
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
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
    const {  isOwner } = this.state;
    const roles = {};

    roles[ROLES.OWNER] = ROLES.OWNER

    this.props.firebase
      .doSignInWithFacebook()
      .then(authUser => {
        return this.props.firebase               
        .user(authUser.user.uid)
        .set({
          roles,
        })
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.OWNER_DASHBOARD);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS){
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
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

    const buttonText = {
      fontSize: "16px",
      textAlign: "center"
    };

    const fbButton = {
      width: "220px",
      textAlign: "center"
    };

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" style={buttonStyle}>
          <FacebookLoginButton
            style={fbButton}
            onClick={() => console.log("Facebook button clicked")}
          >
            <span style={buttonText}>Sign In with Facebook</span>
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
