import React from 'react';
import { Link } from 'react-router-dom';


const Login = props => {
    return (
        <>

            <Link to="/tenant-login"><button>Login as a Renter</button></Link>
            <button>Login as a Property Owner</button>
            <Link to="/manager-login">Login as a Manager</Link>

        </>
    )
}

export default Login
