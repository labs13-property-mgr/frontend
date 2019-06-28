import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import { withAuthorization } from "../../Session";
import { compose } from "recompose";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

import * as ROLES from "../../../constants/roles";

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
    },
    // border: "2px solid red",
    height: "100vh"
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
  },
  vendorCard: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    marginTop: "2rem",
    padding: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    position: "relative",
    zIndex: 1
  },
  buttons: {
    display: "flex",
    width: "20%",
    margin: "0rem auto",
    justifyContent: "space-evenly",
    marginTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "80%"
    }
  },
  buttonsandHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  header: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    },
    fontSize: "2.4rem",
    marginBottom: "2rem"
  },
  icon: {
    "&:hover": {
      color: "#008c3a"
    }
  },
  h3: {
    fontSize: "1.8rem",
    fontWeight: 500
  }
});

class VendorCard extends Component {
  state = {
    vendors: [],
    activeVendor: {},
    vendor: {}
  };

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/vendor";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          vendors: res.data,
          vendor: res.data.find(
            vendor => `${vendor.id}` === this.props.match.params.id
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  deleteVendors = id => {
    return axios
      .delete(`https://rent-me-app.herokuapp.com/api/vendor/${id}`)
      .then(res => {
        const vendors = res.data;
        this.setState({ vendors });

        this.props.history.push("/vendor-addbook");
        // console.log(res);
        // redirect
      })
      .catch(err => {
        console.log(err);
      });
  };

  setActiveVendor = vendor => {
    this.setState({ activeVendor: vendor });
  };

  updateVendor = e => {
    e.preventDefault();
    this.setActiveVendor(this.state.vendor);
    this.props.history.push(`/edit-vendor/${this.state.vendor.id}`);
  };

  deleteVendor = e => {
    e.preventDefault();
    this.deleteVendors(this.state.vendor.id);
  };

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className={this.props.classes.mainContainer}>
        <OwnerUserMenu />
        <main className={this.props.classes.content}>
          <div className={this.props.classes.dashboard}>
            <Button
              onClick={this.goBack}
              className={this.props.classes.backButton}
            >
              <Icon fontSize="small">arrow_back_ios</Icon>
              PREVIOUS PAGE
            </Button>
            <Paper className={this.props.classes.vendorCard}>
              <div className={this.props.classes.buttonsandHeader}>
                <Typography variant="h1" className={this.props.classes.header}>
                  {this.state.vendor.company_name}'s Profile
                </Typography>
                <div className={this.props.classes.buttons}>
                  <Tooltip title="Edit Vendor Info" placement="top">
                    <Icon
                      className={this.props.classes.icon}
                      onClick={this.updateVendor}
                    >
                      edit
                    </Icon>
                  </Tooltip>
                  <Tooltip title="Delete Vendor" placement="top">
                    <Icon
                      className={this.props.classes.icon}
                      onClick={this.deleteVendor}
                    >
                      delete
                    </Icon>
                  </Tooltip>
                </div>
              </div>
              <div>
                <Typography variant="h3" className={this.props.classes.h3}>
                  Details & Contact Information
                </Typography>
                <Grid container>
                  <Grid item md={6}>
                    <p>
                      Contractor Name: {this.state.vendor.first_name}{" "}
                      {this.state.vendor.last_name}
                    </p>
                    <p>Email: {this.state.vendor.email}</p>
                    <p>Phone Number: {this.state.vendor.phone}</p>
                    <p>Address: {this.state.vendor.address}</p>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </div>
        </main>
      </div>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.OWNER];

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(VendorCard);
