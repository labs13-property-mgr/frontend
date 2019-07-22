import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuthorization } from "../../Session";
import * as ROLES from "../../../constants/roles";

//Material UI imports
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "typeface-roboto";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import placeholer from "../../../placeholderImages/modernHouse.png";
//Built component imports
import TrackerBar from "./TrackerBar";
import { useStyles } from "./helpers";
import TenantUserMenu from "../../SideMenu/TenantUserMenu";
import "../../imageMediaQueries.css";
import "./tenantDashboard.css";

const TenantDashboard = props => {
  const [tenant, setTenant] = useState([]);
  const [property, setProperty] = useState(null);
  const [tenantProperty, setTenantProperty] = useState([]);
  const [requests, setRequests] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const { container } = props;

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState({});
  //const [ishidden, setHidden] = useState(false);

  function handleExpandClick(idx) {
    let state = !open[idx];
    setOpen({
      ...open,
      [idx]: state
    });
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  //function hideIssue() {
  //return { showTracker: true }
  //}

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/user")
      .then(res => {
        setTenant(
          res.data.find(
            user =>
              user.uid === JSON.parse(localStorage.getItem("authUser")).uid
          )
        );
      })
      .catch(err => console.log("Crap!", err));

    axios
      .get(
        "https://rent-me-app.herokuapp.com/api/property/propertieswithtenants"
      )
      .then(res => {
        setTenantProperty(res.data);
      })
      .catch(err => console.log("Crap!", err));

    isUserSet();

    getServicesRequest();
  }, [user]);

  const getServicesRequest = () => {
    if (!user) return;
    axios
      .get(`https://rent-me-app.herokuapp.com/api/tenant/${user.id}/services`)
      .then(res => {
        return setRequests(res.data);
      })
      .catch(err => console.log(err));
  };

  const isUserSet = () => {
    if (user) return null;
    axios
      .get("https://rent-me-app.herokuapp.com/api/tenant")
      .then(res =>
        setUser(
          res.data.find(
            user =>
              user.email === JSON.parse(localStorage.getItem("authUser")).email
          )
        )
      )
      .catch(err => console.log(err));
  };

  const deleteRequest = id => {
    axios
      .delete(`https://rent-me-app.herokuapp.com/api/service/${id}`)
      .then(res => getServicesRequest())
      .catch(err => console.log(err));
  };

  const setResolvedRequest = id => {
    return axios
      .put(`https://rent-me-app.herokuapp.com/api/service/${id}`, {
        resolved_tenant: true
      })
      .then(res => getServicesRequest())
      .catch(err => console.log(err));
  };

  const tenantPropertyData = tenantProperty.filter(tp => {
    return tp.tenant_email === tenant.email;
  })[0];

  const otherTenantsInfo = tenantProperty.filter(tp => {
    if (!tenantPropertyData) return;
    return (
      tp.property_id === tenantPropertyData.property_id &&
      tp.tenant_email !== tenantPropertyData.tenant_email
    );
  });


  return (
    <div className={classes.mainContainer}>
      {tenantPropertyData ? (
        <div>
          <TenantUserMenu />
        </div>
      ) : (
        <Tooltip title="You do not have any linked property information" placement="bottom-start">
          <div className={classes.disabledComponent}>
            <TenantUserMenu />
          </div>
        </Tooltip>
      )}
      <main className={classes.content}>
        <div className={classes.dashboard}>
          <Typography variant="h1" className={classes.h1}>
            Tenant Dashboard
          </Typography>
          {/** Dashboard content list of owner's properties **/}
          <Typography variant="h2" className={classes.h2}>
            Property Information
          </Typography>
          <Paper className={classes.paperCard}>
          {tenantPropertyData ? (

            <div>
            <div className={classes.propertyImageSection}>
              {tenantPropertyData.image_url === null ? (
                <img
                  className={classes.propertyImage}
                  id="tenantDashboardPropertyImage"
                  src={placeholer}
                  alt="house placeholder"
                  // onClick={this.handleEditPicture}
                />
              ) : (
                <img
                  className={classes.propertyImage}
                  id="tenantDashboardPropertyImage"
                  src={tenantPropertyData.image_url}
                  alt="rental house photo"
                />
              )}
            </div>
            <div className={classes.paperContent}>
              <Typography variant="h6" className={classes.propertyInfo}>
                Name: {tenantPropertyData && tenantPropertyData.property_name}
              </Typography>
              <Typography variant="h6" className={classes.propertyInfo}>
                Address:{" "}
                {tenantPropertyData && tenantPropertyData.property_address}{" "}
                {tenantPropertyData && tenantPropertyData.property_unit}{" "}
                {tenantPropertyData && tenantPropertyData.property_city},{" "}
                {tenantPropertyData && tenantPropertyData.property_state}{" "}
                {tenantPropertyData && tenantPropertyData.property_zip}
              </Typography>
              <Typography variant="h6" className={classes.propertyInfo}>
                Current Monthly Rent: $
                {tenantPropertyData && tenantPropertyData.property_rent}
                </Typography>
                <Typography variant="h6" className={classes.propertyInfo}>
                  Other Tenants:
              </Typography>
                {otherTenantsInfo &&
                  otherTenantsInfo.map((otherTenant, idx) => (
                    <>
                      <List>
                        <ListItem
                          key={otherTenant.tenant_id}
                          onClick={e => {
                            handleExpandClick(idx);
                          }}
                        >
                          <Typography
                            variant="body1"
                            className={classes.otherTenantNames}
                          >
                            {otherTenant && otherTenant.First_name}{" "}
                            {otherTenant && otherTenant.Last_name}
                          </Typography>
                          <Tooltip title="View more details" placement="right">
                            {open[idx] ? <ExpandLess /> : <ExpandMore />}
                          </Tooltip>
                        </ListItem>
                        <Collapse in={open[idx]} timeout="auto">
                          <List>
                            <ListItem>
                              <Typography variant="body1">
                                Email: {otherTenant && otherTenant.tenant_email}
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Typography variant="body1">
                                Phone Number: {otherTenant && otherTenant.phone}
                              </Typography>
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>
                    </>
                  ))}
              </div>
            </div>
          
            ) : (
              <div>Welcome to RentMe! It looks like you don't have an active property. Please contact your Landlord.</div>
            )}
          </Paper>

          {requests ? (
            requests.map(request => {
              return (
                <TrackerBar
                  classes={classes}
                  request={request}
                  key={request.id}
                  handleDeleteRequest={deleteRequest}
                  //handleHideRequest={hideIssue}
                  handleSetResolvedRequest={setResolvedRequest}
                  handleGetServicesRequest={getServicesRequest}
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

const condition = authUser => authUser && !!authUser.roles[ROLES.TENANT];

export const TenantDashWithFirebase = withAuthorization(condition)(
  TenantDashboard
);
