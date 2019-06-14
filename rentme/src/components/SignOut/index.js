import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const SignOut = ({ firebase }) => (
    <>
        <Link to="/" replace><p onClick={firebase.doSignOut}>Sign Out</p></Link>
    </>
)

export default withFirebase(SignOut)