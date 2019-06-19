import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

export default class EditPropertyForm extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      activeProperty: {}
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/properties";
    axios
      .get(endpoint)
      .then(res => {
        const properties = res.data;
        this.setState({
          properties,
          activeProperty: properties.find(
            p => `${p.id}` === this.props.match.params.id
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  updateProperty = updatedProperty => {
    console.log(updatedProperty);
    axios
      .put(
        `https://rent-me-app.herokuapp.com/api/properties/${
          updatedProperty.id
        }`,
        updatedProperty
      )
      .then(res => {
        const properties = res.data;
        this.setState({
          properties
        });
        console.log("success!");

        // redirect
        this.props.history.push(`/property-card/${updatedProperty.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      activeProperty: {
        ...this.state.activeProperty,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitEditedProperty = e => {
    e.preventDefault();
    this.updateProperty(this.state.activeProperty);
  };

  render() {
    if (!this.state.activeProperty) return <h3>Loading data...</h3>;
    return (
      <div>
        <h1>Edit Property</h1>
        <div>
          <form onSubmit={this.onSubmitEditedProperty}>
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
              value={this.state.activeProperty.property_name}
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
              value={this.state.activeProperty.address}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update
            </Button>
            <Link to="/owner-dash">
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
