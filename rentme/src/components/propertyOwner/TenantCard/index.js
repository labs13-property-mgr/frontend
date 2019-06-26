import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import { withAuthorization } from "../../Session";
import { compose } from "recompose";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
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
    height: "100vh"
  },

  dashboard: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem"
    }
  },

  tenantCard: {
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
  h2: {
    fontSize: "2rem",
    fontWeight: 500
  },

  backButton: {
    "&:hover": {
      color: "#008c3a",
      backgroundColor: "transparent"
    }
  }
});

class TenantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenants: [],
      properties: [],
      property: {},
      activeTenant: {},
      tenant: {}
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/tenant";
    axios
      .get(endpoint)
      .then(res => {
        const tenants = res.data;
        const tenant = res.data.find(
          tenant => `${tenant.id}` === this.props.match.params.id
        );
        this.setState({
          tenants: tenants,
          tenant: tenant
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
    axios
      .get("https://rent-me-app.herokuapp.com/api/property")
      .then(res => {
        const tenantsData = this.state.tenant;
        const properties = res.data;
        console.log(tenantsData);
        this.setState({
          properties: properties,
          property: properties.find(
            property => property.id === tenantsData["property_id"]
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  deleteTenants = id => {
    return axios
      .delete(`https://rent-me-app.herokuapp.com/api/tenant/${id}`)
      .then(res => {
        const tenants = res.data;
        this.setState({ tenants });

        this.props.history.push("/tenant-addbook");
        // console.log(res);
        // redirect
      })
      .catch(err => {
        console.log(err);
      });
  };

  setActiveTenant = tenant => {
    this.setState({ activeTenant: tenant });
  };

  updateTenant = e => {
    e.preventDefault();
    this.setActiveTenant(this.state.tenant);
    this.props.history.push(`/edit-tenant/${this.state.tenant.id}`);
  };

  deleteTenant = e => {
    e.preventDefault();
    this.deleteTenants(this.state.tenant.id);
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
            <div>
              <Paper className={this.props.classes.tenantCard}>
                <div className={this.props.classes.buttonsandHeader}>
                  <Typography
                    variant="h1"
                    className={this.props.classes.header}
                  >
                    {this.state.tenant["First_name"]}'s Profile
                  </Typography>
                  <div className={this.props.classes.buttons}>
                    <Tooltip title="Edit Tenant Info" placement="top">
                      <Icon
                        className={this.props.classes.icon}
                        onClick={this.updateTenant}
                        fontSize="medium"
                      >
                        edit
                      </Icon>
                    </Tooltip>
                    <Tooltip title="Delete Tenant" placement="top">
                      <Icon
                        className={this.props.classes.icon}
                        onClick={this.deleteTenant}
                        fontSize="medium"
                      >
                        delete
                      </Icon>
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <Typography variant="h2" className={this.props.classes.h2}>
                    Personal & Contact Information
                  </Typography>
                  <p>
                    Full Name: {this.state.tenant["First_name"]}{" "}
                    {this.state.tenant["Last_name"]}
                  </p>
                  <p>
                    Spouse's Name:
                    {` ${
                      this.state.tenant["Spouse Name"] === null
                        ? "No info provided"
                        : `${this.state.tenant["Spouse Name"]}`
                    }`}
                  </p>
                  <p>
                    Number in Household:
                    {` ${
                      this.state.tenant["number in household"] === 0
                        ? "No info provided"
                        : `${this.state.tenant["number in household"]}`
                    }`}
                  </p>
                  <p>
                    Contact Info:
                    {` ${
                      this.state.tenant["phone"] === null
                        ? "No info provided"
                        : `${this.state.tenant["phone"]}`
                    }`}
                  </p>
                  <p>
                    Emergency Contact:{" "}
                    {` ${
                      this.state.tenant["emergency contact"] === null
                        ? "No info provided"
                        : `${this.state.tenant["emergency contact"]}`
                    }`}
                  </p>
                  {this.state.property && (
                    <>
                      <p>
                        Property Name:
                        {` ${
                          this.state.property.property_name === null
                            ? "No info provided"
                            : `${this.state.property.property_name}`
                        }`}{" "}
                      </p>
                      <Link to={`/property-card/${this.state.property.id}`}>
                        Property Details
                      </Link>
                    </>
                  )}
                </div>
              </Paper>
            </div>
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
)(TenantCard);
