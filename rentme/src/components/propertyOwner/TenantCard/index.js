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
        this.setState({
          tenants: res.data,
          tenant: res.data.find(
            tenant => `${tenant.id}` === this.props.match.params.id
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
    axios
      .get("https://rent-me-app.herokuapp.com/api/properties")
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
              BACK
            </Button>
            <Container>
              <h1>{this.state.tenant["firstName"]}'s Profile</h1>
              <div>
                <h2>Personal & Contact Information</h2>
                <Grid container>
                  <Grid item md={6}>
                    <p>
                      Full Name: {this.state.tenant["firstName"]}{" "}
                      {this.state.tenant["lastName"]}
                    </p>
                    <p>
                      Spouse's Name:
                      {` ${
                        this.state.tenant["Spouse Name"] === ""
                          ? "N/A"
                          : `${this.state.tenant["Spouse Name"]}`
                      }`}
                    </p>
                    <p>
                      Number in Household:
                      {` ${
                        this.state.tenant["number in household"] === ""
                          ? "N/A"
                          : `${this.state.tenant["number in household"]}`
                      }`}
                    </p>
                    <p>
                      Contact Info:
                      {` ${
                        this.state.tenant["phone"] === ""
                          ? "N/A"
                          : `${this.state.tenant["phone"]}`
                      }`}
                    </p>
                    <p>
                      Emergency Contact:{" "}
                      {this.state.tenant["emergency contact"]}
                    </p>
                    {this.state.property && (
                      <>
                        <p>
                          Property Name:
                          {` ${
                            this.state.property.property_name === ""
                              ? "N/A"
                              : `${this.state.property.property_name}`
                          }`}{" "}
                        </p>
                        <Link to={`/property-card/${this.state.property.id}`}>
                          Property Details
                        </Link>
                      </>
                    )}
                  </Grid>
                </Grid>
              </div>
              <Button onClick={this.updateTenant}>Edit Tenant</Button>
              <Button onClick={this.deleteTenant}>Delete Tenant</Button>
            </Container>
            <hr />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(TenantCard);
