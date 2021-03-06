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
import MaskedInput from "react-text-mask";
import { withAuthorization } from "../../Session";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import "./addTenantForm.css";

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

class AddTenantForm extends Component {
  constructor() {
    super();
    this.state = {
      tenants: [],
      tenant: {
        ["property_id"]: null,
        ["owner_id"]: JSON.parse(localStorage.getItem("authUser")).uid,
        ["owner_phone"]: JSON.parse(localStorage.getItem("authUser")).phone,
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
      .get("https://rent-me-app.herokuapp.com/api/user")
      .then(res => {
        this.setState({
          user: res.data.find(
            user =>
              user.uid === JSON.parse(localStorage.getItem("authUser")).uid
          )
        });
        axios
          .get("https://rent-me-app.herokuapp.com/api/property")
          .then(res => {
            const usersData = this.state.user;
            const properties = res.data;
            const propertiesData = properties.filter(
              property => property.owner_id === usersData.uid
            );

            // propertiesData.push({ id: null, property_name: "None" });

            // propertiesData.push({ id: NaN, property_name: "None" });

            console.log(usersData);
            this.setState({
              properties: propertiesData
            });
          })
          .catch(err => console.log("Crap!", err));
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

  // setActiveTenant = e => {};

  handleChange = e => {
    // e.persist();
    // if (e.target.name === "property_id" && e.target.value === "none") {
    //   this.setState({
    //     tenant: {
    //       ...this.state.tenant,
    //       [e.target.name]: e.target.value,
    //       ["property_id"]: null,
    //       active_tenant: false
    //     }
    //   });
    // } else {
    this.setState(
      {
        tenant: {
          ...this.state.tenant,
          [e.target.name]: e.target.value
          // active_tenant: true
        }
      },
      function() {
        console.log("Tenant", this.state.tenant);
      }
    );

    // }
    // console.log(e.target.name);
    // console.log(e.target.value);
  };

  // handleChange = e => {
  //   e.persist();
  //   this.setState({
  //     tenant: {
  //       ...this.state.tenant,
  //       [e.target.name]: e.target.value
  //     }
  //   });
  // };

  onSubmitAddTenant = e => {
    e.preventDefault();
    const tenant = {
      ...this.state.tenant,
      active_tenant: !!this.state.tenant.property_id
    };
    this.addTenant(tenant).then(tenants => {
      this.setState({
        tenants: tenants,
        tenant: tenant
      });
      console.log("New Tenant", this.state.tenant);
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
              PREVIOUS PAGE
            </Button>
            <Paper className={this.props.classes.formCard}>
              <div className={this.props.classes.pageContainer}>
                <Typography variant="h1" className={this.props.classes.h1}>
                  Add a New Tenant
                </Typography>
                <div>
                  <form
                    onSubmit={this.onSubmitAddTenant}
                    className={this.props.classes.form}
                  >
                    <TextField
                      variant="outlined"
                      required
                      id="First_name"
                      label="First Name"
                      name="First_name"
                      autoComplete="First_name"
                      margin="normal"
                      defaultValue=""
                      onChange={this.handleChange}
                      value={this.state.tenant["First_name"]}
                      helperText="Required*"
                    />
                    <TextField
                      variant="outlined"
                      required
                      id="Last_name"
                      label="Last Name"
                      name="Last_name"
                      autoComplete="Last_name"
                      defaultValue=""
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["Last_name"]}
                      helperText="Required*"
                    />

                    <TextField 
                      variant="outlined"
                      autoFocus
                      onInput={function (e) {
                        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' - ' + x[3] : '');}}
                      
                      guide={true}
                      // variant="outlined"
                      // margin="normal"
                      required
                      id="phone"
                      label="Phone Number"
                      // defaultValue="Phone Number"
                      name="phone"
                      // autoComplete="phone"
                      // autoFocus
                      type="tel"
                      placeholder="Phone Number*"
                      onChange={this.handleChange}
                      value={this.state.tenant["phone"]}
                      helperText="Required*"
                    
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="email"
                      label="Email"
                      name="email"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["email"]}
                    />
                    <TextField
                      variant="outlined"
                      id="Dependent 1"
                      label="Dependent 1"
                      name="Dependent_1"
                      margin="normal"
                      autoComplete="off"
                      onChange={this.handleChange}
                      value={this.state.tenant["Dependent_1"]}
                    />
                    
                    <TextField
                      variant="outlined"
                      id="Dependent 2"
                      label="Dependent 2"
                      name="Dependent 2"
                      autoComplete="Dependent_2"
                      defaultValue=""
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["Dependent_2"]}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="number in household"
                      label="Number of tenants in household"
                      name="number in household"
                      autoComplete="number in household"
                      defaultValue=""
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.tenant["number in household"]}
                    />

                    <TextField
                      variant="outlined"
                      id="Emergency Contact Name"
                      label="Emergency Contact Name"
                      name="Emergency_Contact_Name"
                      autoComplete="emergency contact name"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                      value={this.state.tenant["Emergency_Contact_Name"]}
                    />

                    <TextField
                      onInput={function (e) {
                        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' - ' + x[3] : '');}}
                      
                      guide={true}
                      variant="outlined"
                      margin="normal"
                      // required
                      id="emergency contact"
                      label="Emergency Contact Number"
                      // defaultValue="Phone Number"
                      name="emergency contact"
                      // autoComplete="phone"
                      // autoFocus
                      placeholder="Emergency Contact Number"
                      onChange={this.handleChange}
                      value={this.state.tenant["emergency contact"]}
                    />
                      
                    <TextField
                      variant="outlined"
                      id="notes"
                      label="Notes"
                      name="notes"
                      autoComplete="notes"
                      defaultValue=""
                      margin="dense"
                      multiline
                      rowsMax="4"
                      autoFocus
                      helperText="Add any additional notes you would like on the tenant."
                      onChange={this.handleChange}
                      value={this.state.tenant["notes"]}
                    />
                    <TextField
                      id="property_id"
                      name="property_id"
                      select
                      label="Property Name"
                      value={this.state.tenant["property_id"]}
                      onChange={this.handleChange}
                      helperText="Select which property from your list of properties to tie the tenant to."
                      margin="normal"
                      variant="outlined"
                      placeholder="Please select"
                    >
                      <MenuItem disabled="disabled" value>
                        Please select
                      </MenuItem>
                      <MenuItem value={null}>None</MenuItem>
                      {this.state.properties.map(property => (
                        <MenuItem
                          key={property.id}
                          value={property.id}
                          required
                        >
                          {property.property_name}
                        </MenuItem>
                      ))}
                    </TextField>
                    {/* {this.state.invalid && <div>hiohiohooho</div>} */}
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

const condition = authUser => authUser && !!authUser.roles[ROLES.OWNER];

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(AddTenantForm);
