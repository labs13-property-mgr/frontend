import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { withAuthorization } from "../../Session";
import { compose } from "recompose";

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
  }
});

class AddPropertyForm extends Component {
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

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    if (!this.state.property) return <h3>Loading data...</h3>;
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
            <Paper className={this.props.classes.formCard}>
              <div className={this.props.classes.pageContainer}>
                <h1>Add a New Property</h1>
                <div>
                  <form
                    onSubmit={this.onSubmitAddProperty}
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
                          Add
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Link to="/owner-dash">
                          <Button
                            color="secondary"
                            variant="outlined"
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

const condition = authUser => !!authUser;

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(AddPropertyForm);
