import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

export default class AddTenantForm extends Component {
  constructor() {
    super();
    this.state = {
      tenants: [],
      tenant: {
        ["Spouse Name"]: "",
        ["additional adult name"]: "",
        ["number in household"]: "",
        ["child name"]: "",
        ["contact info"]: "",
        ["emergency contact"]: ""
      }
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
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.tenant["name"]}
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
              value={this.state.tenant["number in household"]}
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
              id="contact info"
              label="contact info"
              name="contact info"
              autoComplete="contact info"
              type="number"
              autoFocus
              onChange={this.handleChange}
              value={this.state.tenant["contact info"]}
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
