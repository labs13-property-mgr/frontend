import React from 'react';
import { Link } from 'react-router-dom';

const ManagerLogin = props => {
    return (
        <>

            <h3>Manager Sign In</h3>
            <Link to="/manager-dash"><button>Sign In</button></Link>


        </>
    )
}

export default ManagerLogin