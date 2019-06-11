import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import GoogleButton from "react-google-button";
import { FacebookLoginButton } from "react-social-login-buttons";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Button from "@material-ui/core/Button";
//import { makeStyles } from "@material-ui/core/styles";

/*const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));*/

const Login = () => (
  <>
    <SignInGoogle />
    <SignInFacebook />
    <RenterLoginForm />
    &nbsp;
    <hr />
    <OwnerSignInGoogle />
    <OwnerSignInFacebook />
    <OwnerLoginForm />
  </>
)


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class RenterLoginFormBase extends Component {
  constructor(props) {
    super(props)

    this.state={ ...INITIAL_STATE } 
  }

  onSubmit = e => {
    const { email, password }=this.state

    this.props.withFirebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.TENANT_DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })

    e.preventDefault()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {email, password, error } = this.state;
    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
        />
        <Button
          disabled={isInvalid}
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
        >Login as a Renter</Button>

        {error && <p>{error.message}</p>}

        <p>
          Don't have an account?{" "}
          <Button
            color="secondary"
            href="/renter-signup"
          >
            Signup
          </Button>
          </p>

      </form>
    )
  }
}


class SignInGoogleBase extends Component {
  constructor(props) {
    super(props)

    this.state = { error: null }
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.TENANT_DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })

    e.preventDefault()
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" ><GoogleButton onClick={() => { console.log('Google button clicked') }} /></button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}


class SignInFacebookBase extends Component {
  constructor(props) {
    super(props)

    this.state = { error: null}
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.TENANT_DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })

    e.preventDefault()
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" ><FacebookLoginButton onClick={() => console.log("Facebook button clicked")}><span>Sign In with Facebook</span></FacebookLoginButton></button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}


class OwnerLoginFormBase extends Component {
  constructor(props) {
    super(props)

    this.state={ ...INITIAL_STATE } 
  }

  onSubmit = e => {
    const { email, password }=this.state

    this.props.withFirebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.TENANT_DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })

    e.preventDefault()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {email, password, error } = this.state;
    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
        />
        <Button
          disabled={isInvalid}
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
        >Login as a Property Owner</Button>

        {error && <p>{error.message}</p>}

        <p>
          Don't have an account?{" "}
          <Button
            color="secondary"
            href="/owner-signup"
          >
            Signup
          </Button>
          </p>

      </form>
    )
  }
}

class OwnerSignInGoogleBase extends Component {
  constructor(props) {
    super(props)

    this.state = { error: null }
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.OWNER_DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })

    e.preventDefault()
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" ><GoogleButton onClick={() => { console.log('Google button clicked') }} /></button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}


class OwnerSignInFacebookBase extends Component {
  constructor(props) {
    super(props)

    this.state = { error: null}
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.OWNER_DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })

    e.preventDefault()
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" ><FacebookLoginButton onClick={() => console.log("Facebook button clicked")}><span>Sign In with Facebook</span></FacebookLoginButton></button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}


const RenterLoginForm = compose(
  withRouter,
  withFirebase,
)(RenterLoginFormBase)

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase)

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase)

const OwnerLoginForm = compose(
  withRouter,
  withFirebase,
)(OwnerLoginFormBase)

const OwnerSignInGoogle = compose(
  withRouter,
  withFirebase,
)(OwnerSignInGoogleBase)

const OwnerSignInFacebook = compose(
  withRouter,
  withFirebase,
)(OwnerSignInFacebookBase)

export default Login;

export { RenterLoginForm, SignInGoogle, SignInFacebook, OwnerLoginForm, OwnerSignInGoogle, OwnerSignInFacebook }
