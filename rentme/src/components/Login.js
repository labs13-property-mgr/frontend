
import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Login = props => {
  const classes = useStyles();

  return (
    <>
      <div>
        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          href="/tenant-dash"
        >
          Login as a Renter
        </Button>
        <p>
          Don't have an account?{" "}
          <Button
            color="secondary"
            className={classes.button}
            href="/renter-signup"
          >
            Signup
          </Button>
        </p>
      </div>
      <div>
        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          href="/property-dash"
        >
          Login as a Property Owner
        </Button>
        <p>
          Don't have an account?{" "}
          <Button
            color="secondary"
            className={classes.button}
            href="/owner-signup"
          >
            Signup
          </Button>
        </p>
      </div>
      <Button color="primary" className={classes.button} href="/manager-login">
        Login as a Manager
      </Button>
    </>
  );
};

export default Login;

