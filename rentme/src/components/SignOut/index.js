import React from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import "./signout.css";

const SignOut = ({ firebase }) => (
  <>
    <Link to={ROUTES.LOGIN} replace className="signout-text">
      <p onClick={firebase.doSignOut}>Sign Out</p>
    </Link>
  </>
);

export default withFirebase(SignOut);
