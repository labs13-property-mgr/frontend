import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { withAuthorization } from "../../Session";
import { compose } from "recompose";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

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

  formCard: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    width: "70%",
    marginTop: "2rem",
    padding: "1.5rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  uploadField: {
    marginTop: "2rem",
    marginBottom: "2rem"
  },

  pageContainer: {
    textAlign: "center",
    margin: "0 auto",
    width: "60%",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "column"
    }
  },

  buttons: {
    display: "flex",
    margin: "0rem auto",
    justifyContent: "space-between",
    marginTop: "1rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
      marginTop: "1rem"
    }
  },
  backButton: {
    "&:hover": {
      color: "#008c3a",
      backgroundColor: "transparent"
    }
  },
  h1: {
    fontSize: "2.4rem",
    marginBottom: "2rem"
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500
  }
});

class EditPropertyForm extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      activeProperty: {}
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/property";
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
        `https://rent-me-app.herokuapp.com/api/property/${updatedProperty.id}`,
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
    if (!this.state.activeProperty) return <h3>Loading data...</h3>;
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
              PREVIOUS PAGE
            </Button>
            <Paper className={this.props.classes.formCard}>
              <div className={this.props.classes.pageContainer}>
                <Typography variant="h1" className={this.props.classes.h1}>
                  Edit Property
                </Typography>
                <div>
                  <form
                    onSubmit={this.onSubmitEditedProperty}
                    className={this.props.classes.form}
                  >
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
                    <div className={this.props.classes.uploadField}>
                      {this.selectedFile === null ? (
                        <img src="./" />
                      ) : (
                        <img src={this.selectedFile} />
                      )}
                      <Tooltip title="Add Property Photo" placement="left">
                        <Input
                          type="file"
                          variant="outlined"
                          onChange={this.handleImageChange}
                        />
                      </Tooltip>

                      <Button onClick={this.handleUploadPicture}>Upload</Button>
                    </div>
                    <div className={this.props.classes.buttons}>
                      <Grid item xs={12} md={5}>
                        <Button
                          className={this.props.classes.button}
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                        >
                          Update
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Link to="/owner-dash">
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            fullWidth
                          >
                            Cancel
                          </Button>
                        </Link>
                      </Grid>
                    </div>
                  </form>
                </div>
              </div>
            </Paper>
          </div>
        </main>
      </div>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.OWNER];

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(EditPropertyForm);
