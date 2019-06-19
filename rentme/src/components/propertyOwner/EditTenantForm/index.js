import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

export default class EditTenantForm extends Component {
  constructor() {
    super();
    this.state = {
      tenants: [],
      activeTenant: {},
      properties: []
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
    axios
      .get("https://rent-me-app.herokuapp.com/api/properties")
      .then(res => {
        this.setState({
          properties: res.data
        });
        console.log(res.data);
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  updateTenant = updatedTenant => {
    console.log("New Data", updatedTenant);
    axios({
      method: "put",
      url: `https://rent-me-app.herokuapp.com/api/tenant/${updatedTenant.id}`,
      data: updatedTenant
    })
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
              id="First_name"
              label="First Name"
              name="First_name"
              autoComplete="First_name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["First_name"]}
            />
            <TextField
              variant="outlined"
              required
              id="Last_name"
              label="Last Name"
              name="Last_name"
              autoComplete="Last_name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["Last_name"]}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["phone"]}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeTenant["email"]}
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
              label="Additional Adult Name"
              name="Additional Adult Name"
              autoComplete="Additional Adult Name"
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
              onChange={this.handleChange}
              value={this.state.activeTenant["number in household"]}
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
            <TextField
              fullWidth
              id="property_id"
              name="property_id"
              select
              label="Select"
              value={this.state.activeTenant["property_id"]}
              onChange={this.handleChange}
              helperText="Please select your currency"
              margin="normal"
              variant="outlined"
            >
              {this.state.properties.map(property => (
                <MenuItem key={property.id} value={property.id}>
                  {property.property_name}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update
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
