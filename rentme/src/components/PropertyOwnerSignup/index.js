import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

//import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";


const PropertyOwnerSignUp = () => (
  <>
    <h4>Sign Up as a Property Owner</h4>
    <OwnerSignUpForm />
  </>
)


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class OwnerSignUpFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = e => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE })
        console.log('new user')
        this.props.history.push(ROUTES.OWNER_DASHBOARD)
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
    const {
      email,
      username,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      email === '' ||
      username === '' ||
      passwordOne !== passwordTwo ||
      passwordOne === ''
      

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <input
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
          />
          <Button
            disabled={isInvalid}
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

          { error && <p>{error.message}</p> }
        </form>
      </>
    );
  }
}


const OwnerSignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.OWNER_SIGNUP}>Sign Up</Link>
  </p>
)

const OwnerSignUpForm = compose( withRouter, withFirebase )(OwnerSignUpFormBase)

export default PropertyOwnerSignUp

export { OwnerSignUpForm, OwnerSignUpLink }
