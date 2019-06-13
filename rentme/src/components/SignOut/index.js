import React from 'react';

import { withFirebase } from '../Firebase';

const SignOut = ({ firebase }) => (
    <>
        <p onClick={firebase.doSignOut}>Sign Out</p>
    </>
)

export default withFirebase(SignOut)