import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import { withAuthorization } from "../../Session";

class EditVendorForm extends Component {
  constructor() {
    super();
    this.state = {
      vendors: [],
      activeVendor: {}
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/vendor";
    axios
      .get(endpoint)
      .then(res => {
        const vendors = res.data;
        this.setState({
          vendors,
          activeVendor: vendors.find(
            v => `${v.id}` === this.props.match.params.id
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  updateVendor = updatedVendor => {
    console.log(updatedVendor);
    axios
      .put(
        `https://rent-me-app.herokuapp.com/api/vendor/${updatedVendor.id}`,
        updatedVendor
      )
      .then(res => {
        const vendors = res.data;
        this.setState({
          vendors
        });
        console.log("success!");

        // redirect
        this.props.history.push(`/vendor-card/${updatedVendor.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      activeVendor: {
        ...this.state.activeVendor,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitEditedVendor = e => {
    e.preventDefault();
    this.updateVendor(this.state.activeVendor);
  };

  render() {
    if (!this.state.activeVendor) return <h3>Loading data...</h3>;
    return (
      <div>
        <h1>Edit Vendor Details</h1>
        <div>
          <form onSubmit={this.onSubmitEditedVendor}>
            <TextField
              variant="outlined"
              id="company_name"
              label="Company Name"
              name="company_name"
              autoComplete="company_name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeVendor.company_name}
            />
            <TextField
              variant="outlined"
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="first_name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeVendor.first_name}
            />
            <TextField
              variant="outlined"
              id="last_name"
              label="Last Name"
              name="last_name"
              autoComplete="last_name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeVendor.last_name}
            />
            <TextField
              variant="outlined"
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeVendor.address}
            />
            <TextField
              variant="outlined"
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeVendor.phone}
            />
            <TextField
              variant="outlined"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.activeVendor.email}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "80%",
                margin: "1rem auto"
              }}
            >
              <Button
                style={{ width: "27%" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Update
              </Button>
              <Link to="/owner-dash">
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(EditVendorForm)
