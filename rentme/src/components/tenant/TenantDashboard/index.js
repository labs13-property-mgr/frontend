import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuthorization } from "../../Session";
import * as ROLES from "../../../constants/roles";

//Material UI imports
import ListItem from "@material-ui/core/ListItem";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//Built component imports
import TrackerBar from "./TrackerBar";
import { useStyles } from "./helpers";
import TenantUserMenu from "../../SideMenu/TenantUserMenu";

import "./tenantDashboard.css";

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const TenantDashboard = props => {
  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [requests, setRequests] = useState(null);
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
        console.log("Get from Dashboard", res);
        setRequests(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={classes.mainContainer}>
      <TenantUserMenu />
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

          {requests ? (
            requests.map(request => {
              return (
                <TrackerBar
                  classes={classes}
                  request={request}
                  key={request.id}
                />
              );
            })
          ) : (
            <p>No requests</p>
          )}
        </div>
      </main>
    </div>
  );
};

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.TENANT];

export const TenantDashWithFirebase = withAuthorization(condition)(TenantDashboard);
