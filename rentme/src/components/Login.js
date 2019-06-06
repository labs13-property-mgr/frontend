import React from 'react';
import { Link } from 'react-router-dom';


const Login = props => {
    return (
        <>

            <Link to="/tenant-dash"><button>Login as a Renter</button></Link>
            <Link to="/property-dash"><button>Login as a Property Owner</button></Link>
            <Link to="/manager-login">Login as a Manager</Link>

        </>
    )
}

export default Login