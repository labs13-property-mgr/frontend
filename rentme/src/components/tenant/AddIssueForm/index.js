import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TenantUserMenu from "../../SideMenu/TenantUserMenu";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

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

class AddIssueForm extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      issues: [],
      issue: {
        date_created: "",
        request_name: "",
        request_description: "",
        status: "",
        notes: "",
        appointment: "",
        followup: "",
        resolved_tenant: false,
        resolved_owner: false,
        property_id: null,
        tenant_id: null,
        owner_id: null,
        received: false
      }
    };
  }

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/service";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          issues: res.data
        });
      })
      .then(axios.get("https://rent-me-app.herokuapp.com/api/user")
        .then(res => this.setState({ user: res.data.find(user => user.email
          === JSON.parse(localStorage.getItem("authUser")).email)})
      ).catch(err => console.log(err.message)))
      .catch(error => {
        console.error("ISSUES ERROR", error);
      })

  }

  addIssue = (newIssue, e) => {
    return axios
      .post("https://rent-me-app.herokuapp.com/api/service", newIssue)
      .then(res => {
        const issues = res.data;
        return issues;
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      issue: {
        ...this.state.issue,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitAddIssue = e => {
    e.preventDefault();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()

    today = `${yyyy}/${mm}/${dd}`

    const issue = {
      ...this.state.issue,
      date_created: today,
      status: "open",
      tenant_id: this.state.user.id
    };

    this.addIssue(issue).then(issues => {
      this.setState({
        issues: issues
      });
      return this.props.history.push("/tenant-dash");
    });
  };

  goBack = e => {
    this.props.history.goBack();
  };

  render() {
    if (!this.state.issue) return <h3>Loading data...</h3>;
    return (
      <div className={this.props.classes.mainContainer}>
        <TenantUserMenu />
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
                <h1>Submit a Work Request</h1>
                <div>
                  <form
                    onSubmit={this.onSubmitAddIssue}
                    className={this.props.classes.form}
                  >
                    <TextField
                      className={this.props.classes.textField}
                      variant="outlined"
                      required
                      id="request_name"
                      label="Request Name"
                      name="request_name"
                      helperText="Please provide a short summary name for your request"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
                    />
                    <TextField
                      variant="outlined"
                      className={this.props.classes.textField}
                      required
                      id="request_description"
                      label="Brief Description"
                      helperText="Please describe the issue"
                      name="request_description"
                      margin="normal"
                      autoFocus
                      onChange={this.handleChange}
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
                          Submit Request
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Link to="/tenant-dash">
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

export default withStyles(styles)(AddIssueForm);
