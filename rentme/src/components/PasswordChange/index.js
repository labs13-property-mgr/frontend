import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import { TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";



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

        const formStyle = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }

        const textField = {
            width: "300px"
        }

        return (
            <>
                <form onSubmit={this.onSubmit} style={formStyle}>
                    <TextField
                        style={textField}
                        variant="outlined"
                        margin="normal"
                        autoFocus 
                        name="passwordOne"
                        type="password"
                        label="New Password"
                        value={passwordOne}
                        onChange={this.onChange}
                    />
                    <TextField
                        style={textField}
                        variant="outlined"
                        margin="normal"
                        autoFocus 
                        name="passwordTwo"
                        type="password"
                        label="Confirm New Password"
                        value={passwordTwo}
                        onChange={this.onChange}
                    />
                    <Button 
                        type="submit" 
                        style={textField}
                        disabled={isInvalid}
                        size="medium"
                        variant="contained"
                        color="primary"
                        >
                        Reset My Password
                    </Button>

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