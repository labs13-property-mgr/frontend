import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from "../Session"

const Account = () => (
    <AuthUserContext.Consumer>
        {authUser => (
                <>
                <h4>Account: </h4><p>{authUser.email}</p>
                <PasswordChangeForm />
            </>
        )}
    </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(Account);