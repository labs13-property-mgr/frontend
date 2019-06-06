import React from "react";
import { Link } from "react-router-dom";

const Login = props => {
  return (
    <>
      <div>
        <Link to="/tenant-dash">
          <button>Login as a Renter</button>
        </Link>
        <p>
          Don't have an account? <Link to="/renter-signup">Signup</Link>
        </p>
      </div>
      <div>
        <button>Login as a Property Owner</button>
        <p>
          Don't have an account? <Link to="/owner-signup">Signup</Link>
        </p>
      </div>
      <Link to="/manager-login">Login as a Manager</Link>
    </>
  );
};

export default Login;
