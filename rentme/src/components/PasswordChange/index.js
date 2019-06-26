import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class PasswordChangeFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    OnSubmit = e => {
        const { passwordOne } = this.state

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                console.log("in password change")
                this.props.history.goBack()  //change to this.props.history.push(/dashboard:${this.state.userID})???
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
        const { passwordOne, passwordTwo, error } = this.state

        const isInvalid = passwordOne !== passwordTwo || passwordOne === ""

        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <input 
                        name="passwordOne"
                        type="password"
                        placeholder="New Password"
                        value={passwordOne}
                        onChange={this.onChange}
                    />
                    <input 
                        name="passwordTwo"
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwordTwo}
                        onChange={this.onChange}
                    />
                    <button type="submit" disabled={isInvalid}>
                        Reset My Password
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </>
        )
    }
}

const PasswordChangeForm = compose(
    withRouter,
    withFirebase,
)(PasswordChangeFormBase)

export default PasswordChangeForm