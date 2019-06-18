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

export default class TenantCard extends Component {
  state = {
    tenants: [],
    activeTenant: {},
    tenant: {}
  };

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

  render() {
    return (
      <div>
        <Container>
          <h1>{this.state.tenant["name"]}'s Profile</h1>
          <div>
            <h2>Personal & Contact Information</h2>
            <Grid container>
              <Grid item md={6}>
                <p>Name: {this.state.tenant["name"]}</p>
                <p>Spouse's Name: {this.state.tenant["Spouse Name"]}</p>
                <p>
                  Number in Household:{" "}
                  {this.state.tenant["number in household"]}
                </p>
                <p>Contact Info: {this.state.tenant["contact info"]}</p>
                <p>
                  Emergency Contact: {this.state.tenant["emergency contact"]}
                </p>
              </Grid>
            </Grid>
          </div>
          <Button onClick={this.updateTenant}>Edit Tenant</Button>
          <Button onClick={this.deleteTenant}>Delete Tenant</Button>
        </Container>
        <hr />
      </div>
    );
  }
}
