import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(sessionStorage.getItem("authUser"))
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          sessionStorage.setItem("authUser", JSON.stringify(authUser));
          this.setState({ authUser });
          console.log(authUser);
        },
        () => {
          sessionStorage.removeItem("authUser");
          this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
