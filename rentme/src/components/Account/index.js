import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from "../Session"


const LOG_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
    }
]

const Account = () => (
    <AuthUserContext.Consumer>
        {authUser => (
                <>
                <h4>Account: </h4><p>{authUser.email}</p>
                <PasswordChangeForm />
                <LoginManagement />
            </>
        )}
    </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(Account);