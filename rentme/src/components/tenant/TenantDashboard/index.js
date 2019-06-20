import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFirebase } from "../../Firebase";
import { compose } from "recompose";

//Material UI imports
import ListItem from "@material-ui/core/ListItem";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
//Built component imports
import TrackerBar from './TrackerBar'
import CustomDrawer from './Drawer'
import { useStyles } from './helpers'

import "./tenantDashboard.css";

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const TenantDashboard = props => {
  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [ requests, setRequests ] = useState(null)
  const { container } = props;

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }


  useEffect(() => {

    axios
      .get("https://rent-me-app.herokuapp.com/api/users")
      .then(res => {
        setTenant(res.data[0]);
      })
      .catch(err => console.log("Crap!", err));

    axios
      .get("https://rent-me-app.herokuapp.com/api/properties")
      .then(res => {
        setProperty(res.data[0]);
      })
      .catch(err => console.log("Crap!", err));

    axios
      .get("https://rent-me-app.herokuapp.com/api/service")
      .then(res => {
        setRequests(res.data)
      })
      .catch(err => console.log(err))

  }, []);

  return (
    <>
      <div className={classes.mainContainer}>
        <AppBar position="sticky" className={classes.subAppBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <h1>Tenant Dashboard</h1>
          </Toolbar>
        </AppBar>

        <nav className={classes.drawer} aria-label="Mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <CustomDrawer classes={classes} ListItemLink={ListItemLink} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <CustomDrawer classes={classes} ListItemLink={ListItemLink}/>
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.dashboard}>
            <h1>Tenant Dashboard</h1>
            {/** Dashboard content list of owner's properties **/}
            <h2>Property Information</h2>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <p>Name: {property && property.property_name}</p>
                    <p>Address: {property && property.address}</p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {requests ? requests.map(request => {
              return (
                <TrackerBar
                classes={classes}
                request={request}
                key={request.id}
                />
              )
            }) : <p>No requests</p>}
          </div>
        </main>
      </div>
    </>
  );
};

export const TenantDashWithFirebase = compose(
  withFirebase
)(TenantDashboard);
