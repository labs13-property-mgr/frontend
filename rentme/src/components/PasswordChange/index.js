import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class PasswordChangeForm extends Component {
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

        return (
            <>
                <form>
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
                    <button>
                        Reset My Password
                    </button>
                </form>
            </>
        )
    }
}

export default withFirebase(PasswordChangeForm)