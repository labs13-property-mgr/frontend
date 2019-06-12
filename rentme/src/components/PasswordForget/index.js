import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const PasswordForget = () => (
    <>
        <h4>Password Forget</h4>
        <PasswordForgetForm />
    </>
)


const INITIAL_STATE = {
    email: '',
    error: null,
}

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = e => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
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
        const { email, error } = this.state

        const isInvalid = email === ""

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={this.onChange}
                />

                <button disabled={isInvalid} type="submit">Reset My Password</button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const ForgotPasswordLink = () => (
        <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot Your Password?</Link></p>
)

export default PasswordForget

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, ForgotPasswordLink }