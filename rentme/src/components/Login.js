import React from 'react';
import { Link } from 'react-router-dom';


const Login = props => {
    return (
        <>

            <button>Login as a Renter</button>
            <button>Login as a Property Owner</button>
            <Link to="/manager-login">Login as a Manager</Link>

        </>
    )
}

export default Login