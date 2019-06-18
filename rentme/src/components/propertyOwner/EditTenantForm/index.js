import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

export default class EditTenantForm extends Component {
  constructor() {
    super();
    this.state = {
      tenants: [],
      activeTenant: {}
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/tenant";
    axios
      .get(endpoint)
      .then(res => {
        const tenants = res.data;
        this.setState({
          tenants,
          activeTenant: tenants.find(
            t => `${t.id}` === this.props.match.params.id
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  updateTenant = updatedTenant => {
    console.log("New Data", updatedTenant);
    axios
      .put(
        `https://rent-me-app.herokuapp.com/api/tenant/${updatedTenant.id}`,
        updatedTenant
      )
      .then(res => {
        const tenants = res.data;
        this.setState({
          tenants
        });
        console.log("success!");

        // redirect
        this.props.history.push(`/tenant-card/${updatedTenant.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      activeTenant: {
        ...this.state.activeTenant,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitEditedTenant = e => {
    e.preventDefault();
    console.log("running");
    this.updateTenant(this.state.activeTenant);
  };

  render() {
    if (!this.state.activeTenant) return <h3>Loading data...</h3>;
    return (
      <div>
        <h1>Edit Tenant</h1>
        <div>
          <form onSubmit={this.onSubmitEditedTenant}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["name"]}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="Spouse Name"
              label="Spouse Name"
              name="Spouse Name"
              autoComplete="Spouse Name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["Spouse Name"]}
            />
            <TextField
              variant="outlined"
              fullWidth
              id="additional adult Name"
              label="additional adult name"
              name="additional adult name"
              autoComplete="additional adult name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["additional adult name"]}
            />
            <TextField
              variant="outlined"
              fullWidth
              id="child name"
              label="child name"
              name="child name"
              autoComplete="child name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["child name"]}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number in household"
              label="number in household"
              name="number in household"
              autoComplete="number in household"
              type="number"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["number in household"]}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contact info"
              label="contact info"
              name="contact info"
              autoComplete="contact info"
              type="number"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["contact info"]}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="emergency contact"
              label="emergency contact"
              name="emergency contact"
              autoComplete="emergency contact"
              type="number"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["emergency contact"]}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update Tenant
            </Button>
            <Link to="/tenant-addbook">
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
