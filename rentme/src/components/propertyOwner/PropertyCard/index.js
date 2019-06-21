import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import Icon from "@material-ui/core/Icon";
import { compose } from "recompose";
import { withAuthorization } from "../../Session";

import * as ROLES from "../../../constants/roles";

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

class PropertyCard extends Component {
  state = {
    selectedFile: null,
    properties: [],
    activeProperty: {},
    property: {}
  };

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/property";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          properties: res.data,
          property: res.data.find(
            property => `${property.id}` === this.props.match.params.id
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  deleteProperties = id => {
    return axios
      .delete(`https://rent-me-app.herokuapp.com/api/property/${id}`)
      .then(res => {
        const properties = res.data;
        this.setState({ properties });

        this.props.history.push("/owner-dash");
        // console.log(res);
        // redirect
      })
      .catch(err => {
        console.log(err);
      });
  };

  setActiveProperty = property => {
    this.setState({ activeProperty: property });
  };

  updateProperty = e => {
    e.preventDefault();
    this.setActiveProperty(this.state.property);
    this.props.history.push(`/edit-property/${this.state.property.id}`);
  };

  deleteProperty = e => {
    e.preventDefault();
    this.deleteProperties(this.state.property.id);
  };

  handleImageChange = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  handleUploadPicture = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios.post(
      "https://us-central1-rentme-52af4.cloudfunctions.net/uploadFile",
      fd,
      {
        onUploadProgress: progressEvent => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        }
      }
    );
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
            <h1>Property Card</h1>
            <div>
              <h2>{this.state.property.property_name}</h2>
              <p>{this.state.property.address}</p>
              <Button onClick={this.updateProperty}>Edit Property</Button>
              <Button onClick={this.deleteProperty}>Delete Property</Button>
            </div>

            <div>
              {this.selectedFile === null ? (
                <img src="./" />
              ) : (
                <img src={this.selectedFile} />
              )}

              <input type="file" onChange={this.handleImageChange} />

              <Tooltip title="Add Property Photo" placement="top">
                <button onClick={this.handleUploadPicture}>Upload</button>
              </Tooltip>
            </div>

            <Button
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
              href="/add-tenant"
            >
              Add a Tenant
            </Button>
          </div>
        </main>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(PropertyCard);
