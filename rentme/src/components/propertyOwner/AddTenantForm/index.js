import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

export default class AddTenantForm extends Component {
  constructor() {
    super();
    this.state = {
      tenants: [],
      tenant: {
        ["property_id"]: "",
        ["First_name"]: "",
        ["Last_name"]: "",
        ["phone"]: "",
        ["email"]: "",
        ["Spouse Name"]: "",
        ["additional adult name"]: "",
        ["number in household"]: "",
        ["child name"]: "",
        ["emergency contact"]: "",
        active_tenant: false
      },
      properties: []
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/tenant";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          tenants: res.data
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

  addTenant = newTenant => {
    return axios
      .post("https://rent-me-app.herokuapp.com/api/tenant", newTenant)
      .then(res => {
        const tenants = res.data;
        return tenants;
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      tenant: {
        ...this.state.tenant,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitAddTenant = e => {
    e.preventDefault();
    const tenant = {
      ...this.state.tenant
    };
    this.addTenant(tenant).then(tenants => {
      this.setState({
        tenants: tenants
      });
      return this.props.history.push("/tenant-addbook");
    });
  };

  render() {
    if (!this.state.tenant) return <h3>Loading data...</h3>;
    return (
      <div>
        <h1>Add a New Tenant</h1>
        <div>
          <form onSubmit={this.onSubmitAddTenant}>
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
              value={this.state.tenant["First_name"]}
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
              value={this.state.tenant["Last_name"]}
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
              value={this.state.tenant["phone"]}
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
              value={this.state.tenant["email"]}
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
              value={this.state.tenant["Spouse Name"]}
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
              value={this.state.tenant["additional adult name"]}
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
              value={this.state.tenant["child name"]}
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
              value={this.state.tenant["number in household"]}
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
              value={this.state.tenant["emergency contact"]}
            />
            <TextField
              fullWidth
              id="property_id"
              name="property_id"
              select
              label="Select"
              value={this.state.tenant["property_id"]}
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
              Add Tenant
            </Button>
            <Link to="/">
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
