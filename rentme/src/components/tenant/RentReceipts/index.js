import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TenantUserMenu from "../../SideMenu/TenantUserMenu";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const styles = theme => ({
  mainContainer: {
    display: "block"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: drawerWidth
    }
  },

  dashboard: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem"
    }
  },
  backButton: {
    "&:hover": {
      color: "#008c3a",
      backgroundColor: "transparent"
    }
  }
});

class RentReceipts extends Component {
  state = {};

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className={this.props.classes.mainContainer}>
        <TenantUserMenu />
        <main className={this.props.classes.content}>
          <div className={this.props.classes.dashboard}>
            <Button
              onClick={this.goBack}
              className={this.props.classes.backButton}
            >
              <Icon fontSize="small">arrow_back_ios</Icon>
              BACK
            </Button>
            <ul>
              <li>Receipt 1</li>
              <li>Receipt 2</li>
              <li>Receipt 3</li>
              <li>Receipt 4</li>
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(RentReceipts);
