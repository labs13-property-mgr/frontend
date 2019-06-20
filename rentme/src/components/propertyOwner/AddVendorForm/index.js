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

<<<<<<< HEAD
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
=======
import { withAuthorization } from "../../Session";
>>>>>>> 2c39416b81b695563b56fb0230cd0017f9ea4546

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
              BACK
            </Button>
            <Paper className={this.props.classes.formCard}>
              <div className={this.props.classes.pageContainer}>
                <h1>Add a New Vendor</h1>
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

<<<<<<< HEAD
export default withStyles(styles)(AddVendorForm);
=======
const condition = authUser => !!authUser

export default withAuthorization(condition)(AddVendorForm)
>>>>>>> 2c39416b81b695563b56fb0230cd0017f9ea4546
