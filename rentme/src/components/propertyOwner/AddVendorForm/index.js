import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import Typography from "@material-ui/core/Typography";
import MaskedInput from "react-text-mask";
import "typeface-roboto";
import "./addVendorForm.css";

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
  },
  address: {
    marginBottom: "1rem"
  }
});

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
        email: "",
        owner_id: JSON.parse(localStorage.getItem("authUser")).uid
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
        vendors: vendors,
        vendor: vendor
      });
      console.log("Vendor", vendor);
      return this.props.history.push("/vendor-addbook");
    });
  };

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    if (!this.state.vendor) return <h3>Loading data...</h3>;
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
                  Add a New Vendor
                </Typography>
                <div>
                  <form
                    onSubmit={this.onSubmitAddVendor}
                    className={this.props.classes.form}
                  >
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
                      className={this.props.classes.address}
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
                      onInput={function (e) {
                        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' - ' + x[3] : '');}}
                      
                      guide={true}
                      placeholder="Phone Number"
                      variant="outlined"
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      // autoComplete="phone"
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
                        <Link to="/vendor-addbook">
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
)(AddVendorForm);
