import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignOut = ({ firebase }) => (
    <>
        <Link to={ROUTES.LOGIN} replace><p onClick={firebase.doSignOut}>Sign Out</p></Link>
    </>
)

export default withFirebase(SignOut)