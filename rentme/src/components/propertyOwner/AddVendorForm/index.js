import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import { withAuthorization } from "../../Session";

class AddVendorForm extends Component {
  constructor() {
    super();
    this.state = {
      vendors: [],
      vendor: {
        company_name: "",
        address: "",
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
      }
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/vendor";

    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          vendors: res.data
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  addVendor = newVendor => {
    return axios
      .post("https://rent-me-app.herokuapp.com/api/vendor", newVendor)
      .then(res => {
        const vendors = res.data;
        return vendors;
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      vendor: {
        ...this.state.vendor,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitAddVendor = e => {
    e.preventDefault();
    const vendor = {
      ...this.state.vendor
    };
    this.addVendor(vendor).then(vendors => {
      this.setState({
        vendors: vendors
      });
      return this.props.history.push("/vendor-addbook");
    });
  };

  render() {
    if (!this.state.vendor) return <h3>Loading data...</h3>;
    return (
      <div style={{ textAlign: "center", margin: "0 auto", width: "40%" }}>
        <h1>Add a New Vendor</h1>
        <div>
          <form onSubmit={this.onSubmitAddVendor}>
            <TextField
              variant="outlined"
              id="company_name"
              label="Company Name"
              name="company_name"
              autoComplete="company_name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.vendor.company_name}
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
              value={this.state.vendor.first_name}
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
              value={this.state.vendor.last_name}
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
              value={this.state.vendor.address}
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
              value={this.state.vendor.phone}
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
              value={this.state.vendor.email}
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
                Add
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

export default withAuthorization(condition)(AddVendorForm)