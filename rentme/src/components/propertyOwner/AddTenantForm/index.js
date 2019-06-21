import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { withAuthorization } from "../../Session";
import { compose } from "recompose";

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
  pageContainer: {
    textAlign: "center",
    margin: "0 auto",
    width: "70%",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "column"
    }
  },

  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
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

class AddTenantForm extends Component {
  constructor() {
    super();
    this.state = {
      tenants: [],
      tenant: {
        ["property_id"]: "",
        ["firstName"]: "",
        ["lastName"]: "",
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

  setActiveTenant = e => {};

  // handleChange = e => {
  //   // e.persist();
  //   console.log(this.state.tenant);
  //   if (e.target.name === "property_id" && e.target.value !== null) {
  //     this.setState({
  //       tenant: {
  //         ...this.state.tenant,
  //         [e.target.name]: e.target.value,
  //         active_tenant: true
  //       }
  //     });
  //   } else {
  //     this.setState({
  //       tenant: {
  //         ...this.state.tenant,
  //         [e.target.name]: e.target.value
  //       }
  //     });
  //   }
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  // };

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

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    if (!this.state.tenant) return <h3>Loading data...</h3>;
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
                <h1>Add a New Tenant</h1>
                <div>
                  <form
                    onSubmit={this.onSubmitAddTenant}
                    className={this.props.classes.form}
                  >
                    <TextField
                      variant="outlined"
                      required
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="firstName"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["firstName"]}
                    />
                    <TextField
                      variant="outlined"
                      required
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lastName"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["lastName"]}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="phone"
                      label="Phone Number"
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
                      id="Spouse Name"
                      label="Spouse's Name"
                      name="Spouse Name"
                      autoComplete="Spouse Name"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["Spouse Name"]}
                    />
                    <TextField
                      variant="outlined"
                      id="additional adult Name"
                      label="Additional Tenant Name"
                      name="Additional Adult Name"
                      autoComplete="Additional Adult Name"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["additional adult name"]}
                    />
                    <TextField
                      variant="outlined"
                      id="child name"
                      label="Child Name"
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
                      id="number in household"
                      label="Number of tenants in household"
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
                      id="emergency contact"
                      label="Emergency Contact Number"
                      name="emergency contact"
                      autoComplete="emergency contact"
                      type="number"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["emergency contact"]}
                    />
                    <TextField
                      id="property_id"
                      name="property_id"
                      select
                      label="Property associated with tenant"
                      value={this.state.tenant["property_id"]}
                      onChange={this.handleChange}
                      helperText="Select which property from your list of properties to tie the tenant to."
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
                          Add
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Link to="/">
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
)(AddTenantForm);
