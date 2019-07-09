import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import ServiceRequests from "./ServiceRequests";
import Icon from "@material-ui/core/Icon";
import { compose } from "recompose";
import { withAuthorization } from "../../Session";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
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
    },
    // border: "2px solid red",
    height: "100vh"
    // backgroundImage: `url(${cardBackground})`,
    // backgroundSize: "cover",
    // overflow: "hidden"
  },

  propertyCard: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    marginTop: "2rem",
    padding: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    position: "relative",
    zIndex: 1
  },

  dashboard: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem"
    }
  },
  backButton: {
    "&:hover": {
      color: "#008c3a",
      backgroundColor: "transparent"
    }
  },
  buttons: {
    display: "flex",
    width: "20%",
    margin: "0rem auto",
    justifyContent: "space-evenly",
    marginTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "80%"
    }
  },
  buttonsandHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  header: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    },
    fontSize: "2.4rem",
    marginBottom: "2rem"
  },
  icon: {
    "&:hover": {
      color: "#008c3a"
    }
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500
  },
  tenantListToggle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1rem"
  },
  listItem: {
    textDecoration: "none",
    width: "30%",
    height: "2.5rem",
    "&:hover": {
      fontStyle: "italic",
      color: "#008c3a",
      fontWeight: "bold",
      backgroundColor: "white"
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#3F51B5" },
    secondary: {
      main: "#008c3a",
      light: "#33a361"
    }
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class PropertyCard extends Component {
  state = {
    selectedFile: null,
    properties: [],
    tenants: [],
    activeProperty: {},
    property: {},
    open: true
  };

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/property";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          properties: res.data,
          property: res.data.find(
            property => `${property.id}` === this.props.match.params.id
          )
        });
        axios
          .get("https://rent-me-app.herokuapp.com/api/tenant")
          .then(res => {
            const propertiesData = this.state.property;
            const tenants = res.data;
            console.log("Properties", propertiesData);
            this.setState({
              tenants: tenants.filter(
                tenant => tenant.property_id === propertiesData.id
              )
            });
          })
          .catch(err => console.log("Crap!", err));
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  deleteProperties = id => {
    return axios
      .delete(`https://rent-me-app.herokuapp.com/api/property/${id}`)
      .then(res => {
        const properties = res.data;
        this.setState({ properties });

        this.props.history.push("/owner-dash");
      })
      .catch(err => {
        console.log(err);
      });
  };

  setActiveProperty = property => {
    this.setState({ activeProperty: property });
  };

  updateProperty = e => {
    e.preventDefault();
    this.setActiveProperty(this.state.property);
    this.props.history.push(`/edit-property/${this.state.property.id}`);
  };

  deleteProperty = e => {
    e.preventDefault();
    this.deleteProperties(this.state.property.id);
  };

  // handleImageChange = e => {
  //   this.setState({
  //     selectedFile: e.target.files[0]
  //   });
  // };

  // handleUploadPicture = () => {
  //   const fd = new FormData();
  //   fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
  //   axios.post(
  //     "https://us-central1-rentme-52af4.cloudfunctions.net/uploadFile",
  //     fd,
  //     {
  //       onUploadProgress: progressEvent => {
  //         console.log(
  //           "Upload Progress: " +
  //             Math.round((progressEvent.loaded / progressEvent.total) * 100) +
  //             "%"
  //         );
  //       }
  //     }
  //   );
  // };

  goBack = e => {
    this.props.history.goBack();
  };

  ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  handleExpandClick = e => {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  };

  render() {
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
            <div>
              <Paper className={this.props.classes.propertyCard}>
                <div className={this.props.classes.buttonsandHeader}>
                  <Typography
                    variant="h1"
                    className={this.props.classes.header}
                  >
                    {this.state.property.property_name}
                  </Typography>
                  <div className={this.props.classes.buttons}>
                    <Tooltip title="Edit Property Info" placement="top">
                      <Icon
                        className={this.props.classes.icon}
                        onClick={this.updateProperty}
                      >
                        edit
                      </Icon>
                    </Tooltip>
                    <Tooltip title="Delete Property" placement="top">
                      <Icon
                        className={this.props.classes.icon}
                        onClick={this.deleteProperty}
                      >
                        delete
                      </Icon>
                    </Tooltip>
                  </div>
                </div>
                <p>Address: {this.state.property.address}</p>
                <div>
                  <div
                    className={this.props.classes.tenantListToggle}
                    onClick={this.handleExpandClick}
                  >
                    <Typography variant="h6">Tenants</Typography>
                    {this.state.open ? <ExpandMore /> : <ExpandLess />}
                  </div>
                  {this.state.tenants.map(tenant => (
                    <Collapse
                      in={!this.state.open}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List>
                        <ListItemLink
                          className={this.props.classes.listItem}
                          href={`/tenant-card/${tenant.id}`}
                        >
                          <p key={tenant.id}>
                            {tenant.First_name} {tenant.Last_name}
                          </p>
                        </ListItemLink>
                      </List>
                    </Collapse>
                  ))}
                </div>
                <ThemeProvider theme={theme}>
                  <Grid item xs={12} md={2}>
                    <Button
                      type="submit"
                      size="medium"
                      color="secondary"
                      variant="outlined"
                      href="/add-tenant"
                      className={this.props.classes.addButton}
                      size="small"
                      fullWidth
                    >
                      Add a Tenant
                    </Button>
                  </Grid>
                </ThemeProvider>
              </Paper>
              <ServiceRequests />

            </div>

            {/* <div>
              {this.selectedFile === null ? (
                <img src="./" />
              ) : (
                <img src={this.selectedFile} />
              )}

              <input type="file" onChange={this.handleImageChange} />

              <Tooltip title="Add Property Photo" placement="top">
                <button onClick={this.handleUploadPicture}>Upload</button>
              </Tooltip>

            </div>

            <Button
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
              href="/add-tenant"
            >
              Add a Tenant
            </Button>

            <ServiceRequests />

            </div> */}
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
)(PropertyCard);
