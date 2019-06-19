import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from "../Session"

const Account = () => (
    <>
        <h4>Account</h4>
        <PasswordChangeForm />
    </>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(Account);