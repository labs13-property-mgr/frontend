import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto"
  },
  textField: {
    backgroundColor: "white"
  },

  buttonLayout: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "2rem"
  },
  buttonDistance: {
    marginRight: "1rem"
  }
};

class AddIssueForm extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      issue: {
        id: "",
        date_created: "",
        request_name: "",
        status: "",
        request_description: "",
        notes: "",
        contractor: "",
        appointment: "",
        followup: "",
        resolved_tenant: false,
        resolved_owner: false
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
      .catch(error => {
        console.error("ISSUES ERROR", error);
      });
  }

  addIssue = (newIssue, e) => {
    return axios
      .post("https://rent-me-app.herokuapp.com/api/service", newIssue)
      .then(res => {
        const issues = res.data;
        console.log("From post request", issues)
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
    const today = new Date()
    const issue = {
      ...this.state.issue,
      date_created: today.toLocaleString("en-US"),
      status: "open"

    };
    console.log("From onSubmitAddIssue", issue)
    this.addIssue(issue).then(issues => {
      this.setState({
        issues: issues
      });
      return this.props.history.push("/tenant-dash");
    });
  };

  render() {
    if (!this.state.issue) return <h3>Loading data...</h3>;
    return (
      <Container className={this.props.classes.formContainer}>
        <h1>Submit a Work Request</h1>
        <div>
          <form onSubmit={this.onSubmitAddIssue}>
            <TextField
              className={this.props.classes.textField}
              // variant="filled"
              required
              id="request_name"
              label="Request Name"
              name="request_name"
              helperText="Please provide a short summary name for your request"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              // value={this.state.issue.name}
            />
            <TextField
              // variant="filled"
              className={this.props.classes.textField}
              required
              fullWidth
              id="request_description"
              label="Brief Description"
              helperText="Please describe the issue"
              name="request_description"
              margin="normal"
              autoFocus
              onChange={this.handleChange}
              // value={this.state.issue.description}
            />
            <div className={this.props.classes.buttonLayout}>
              <Button
                className={this.props.classes.buttonDistance}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit Request
              </Button>
              <Link to="/tenant-dash">
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(AddIssueForm);
