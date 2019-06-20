import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
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

class EditTenantForm extends Component {
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

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    if (!this.state.activeTenant) return <h3>Loading data...</h3>;
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
                <h1>Edit Tenant</h1>
                <div>
                  <form
                    onSubmit={this.onSubmitEditedTenant}
                    className={this.props.classes.form}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      required
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="firstName"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.activeTenant["firstName"]}
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      required
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lastName"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.activeTenant["lastName"]}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
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
                      fullWidth
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
                        <Link to="/tenant-addbook">
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

const condition = authUser => !!authUser;

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(EditTenantForm);
