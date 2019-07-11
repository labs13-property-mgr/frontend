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
import Typography from "@material-ui/core/Typography";
import MaskedInput from "react-text-mask";
import "typeface-roboto";
import "./editVendorForm.css";

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
  },
  address: {
    marginBottom: "1rem"
  }
});

class EditVendorForm extends Component {
  constructor() {
    super();
    this.state = {
      vendors: [],
      activeVendor: {}
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/vendor";
    axios
      .get(endpoint)
      .then(res => {
        const vendors = res.data;
        this.setState({
          vendors,
          activeVendor: vendors.find(
            v => `${v.id}` === this.props.match.params.id
          )
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  updateVendor = updatedVendor => {
    console.log(updatedVendor);
    axios
      .put(
        `https://rent-me-app.herokuapp.com/api/vendor/${updatedVendor.id}`,
        updatedVendor
      )
      .then(res => {
        const vendors = res.data;
        this.setState({
          vendors
        });
        console.log("success!");

        // redirect
        this.props.history.push(`/vendor-card/${updatedVendor.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      activeVendor: {
        ...this.state.activeVendor,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitEditedVendor = e => {
    e.preventDefault();
    this.updateVendor(this.state.activeVendor);
  };

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    if (!this.state.activeVendor) return <h3>Loading data...</h3>;
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
                  Edit Vendor Details
                </Typography>
                <form
                  onSubmit={this.onSubmitEditedVendor}
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
                    value={this.state.activeVendor.company_name}
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
                    value={this.state.activeVendor.first_name}
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
                    value={this.state.activeVendor.last_name}
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
                    value={this.state.activeVendor.address}
                  />
                  <MaskedInput
                    className="masked-input"
                    mask={[
                      "(",
                      /[1-9]/,
                      /\d/,
                      /\d/,
                      ")",
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/
                    ]}
                    guide={true}
                    variant="outlined"
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    placeholder="Phone Number"
                    // autoComplete="phone"
                    // margin="normal"
                    // autoFocus
                    onChange={this.handleChange}
                    value={this.state.activeVendor.phone}
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
                    value={this.state.activeVendor.email}
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
                        Update
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
)(EditVendorForm);
