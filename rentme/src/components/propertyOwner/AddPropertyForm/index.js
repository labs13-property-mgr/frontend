import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

export default class AddPropertyForm extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      property: {
        property_name: "",
        address: ""
      }
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/properties";

    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          properties: res.data
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  addProperty = newProperty => {
    return axios
      .post("https://rent-me-app.herokuapp.com/api/properties", newProperty)
      .then(res => {
        const properties = res.data;
        return properties;
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      property: {
        ...this.state.property,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitAddProperty = e => {
    e.preventDefault();
    const property = {
      ...this.state.property
    };
    this.addProperty(property).then(properties => {
      this.setState({
        properties: properties
      });
      return this.props.history.push("/owner-dash");
    });
  };

  render() {
    if (!this.state.property) return <h3>Loading data...</h3>;
    return (
      <div style={{textAlign: "center", margin: "0 auto", width: "40%"}}>
        <h1>Add a New Property</h1>
        <div>
          <form onSubmit={this.onSubmitAddProperty}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="property_name"
              label="Property Name"
              name="property_name"
              autoComplete="property_name"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.property.property_name}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              value={this.state.property.address}
            />
            <div style={{display: "flex", justifyContent: "space-around", width: "80%", margin: "1rem auto"}}>
              <Button style={{width: "27%"}}type="submit" variant="contained" color="primary">
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
