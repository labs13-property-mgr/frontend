import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./tenantDashboard.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: "block"
  },

  test: {
    // border: "1px solid black"
  },

  // sideMenu: {
  //   position: "fixed",
  //   border: "1px solid black",
  //   height: "100%"
  // },
  propertyCards: {
    // marginTop: "3rem",
    marginTop: "3rem"
  },
  dashboard: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem"
    }
  },
  addLayout: {
    display: "flex",
    justifyContent: "space-between",
    width: "55%",
    alignItems: "center",
    paddingLeft: ".6rem"
  },
  addIcon: {
    color: "lightgrey",
    "&:hover": {
      color: "#008c3a"
    }
  },

  menuItem: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "#008c3a"
    },
    display: "flex",
    alignItems: "center"
  },

  menuText: {
    marginLeft: "1rem"
  },

  addressBooks: {
    width: "100%"
  },

  resourcesHeader: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "1rem",
    color: "grey"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth
    },
    top: "0"
  },
  subAppBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: "none"
    },
    backgroundColor: "#008c3a"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: ""
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: drawerWidth
    }
  },
  progressBarSection: {
    marginTop: "2rem"
  },
  progressBar: {
    flexGrow: 1,
    height: "1rem",
    borderRadius: ".5rem"
  },
  progressIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "1rem"
  },
  progressText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressContent: {
    display: "flex",
    flexDirection: "column"
  },
  icon: {
    fontSize: "2rem"
  }
}));

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const TenantDashboard = props => {
  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);

  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div>
        <h2 className={classes.resourcesHeader}>Resources/Links</h2>
        <h3 className={classes.resourcesHeader}>Leasing Documents</h3>
        <List>
          <ListItemLink className={classes.menuItem} href="/view-receipts">
            <Icon fontSize="medium">folder</Icon>
            <p className={classes.menuText}>Rent Receipts</p>
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/view-receipts">
            <Icon fontSize="medium">folder</Icon>
            <p className={classes.menuText}>Lease Application</p>
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/view-receipts">
            <Icon fontSize="medium">folder</Icon>
            <p className={classes.menuText}>Lease Agreement Contract</p>
          </ListItemLink>
        </List>
        <Divider />
        <h3 className={classes.resourcesHeader}>Maintenance & Requests</h3>
        <List>
          <ListItemLink className={classes.menuItem} href="/add-work-request">
            <Icon fontSize="medium">build</Icon>
            <p className={classes.menuText}>Submit an Issue/Work Request</p>
          </ListItemLink>
        </List>
      </div>
    </div>
  );

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/users")
      .then(res => {
        setTenant(res.data[0]);
        // console.log(res.data);
      })
      .catch(err => console.log("Crap!", err));
    axios
      .get("https://rent-me-app.herokuapp.com/api/properties")
      .then(res => {
        setProperty(res.data[0]);
      })
      .catch(err => console.log("Crap!", err));

    const steps = [
      {
        number: 1,
        completed: false
      },
      {
        number: 2,
        completed: false
      },
      {
        number: 3,
        completed: false
      },
      {
        number: 4,
        completed: false
      }
    ];

    setCurrentStep(steps[0].number);
  }, []);

  const onButtonClick = event => {
    setCurrentStep(currentStep + 1);
    setProgressWidth(currentStep * 25);
  };

  return (
    <>
      <d container className={classes.mainContainer}>
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
              {drawer}
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
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        {/* <Container className={classes.mainContainer}> */}

        <main className={classes.content}>
          <div className={classes.dashboard}>
            {" "}
            <h1>Tenant Dashboard</h1>
            {/*Dashboard content */} {/* list of owner's properties */}
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
            <div className={classes.progressBarSection}>
              <h3>Active Service/Work Requests</h3>{" "}
              {/*ACTIVE SERVICE REQUEST SECTION */}
              <h4>Name:</h4>
              <LinearProgress
                className={classes.progressBar}
                variant="determinate"
                value={progressWidth}
              />
              <div className={classes.progressContent}>
                <Grid md={12} className={classes.progressIcons}>
                  {" "}
                  {/*Icon Layout */}
                  <>
                    {" "}
                    {/*Step 1 - Beginning of tracker, no updated from owner/manager */}
                    <div
                      className={`step${
                        progressWidth === 0
                          ? " in-progress"
                          : progressWidth > 0
                          ? " completed"
                          : ""
                      }`}
                    >
                      <Icon className={classes.icon}>home</Icon>
                    </div>
                    <div
                      className={`check${
                        progressWidth > 0 ? " completed" : ""
                      }`}
                    >
                      <Icon className={classes.icon}>check_circle</Icon>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 2  */}
                    <div
                      className={`step${
                        progressWidth === 25
                          ? " in-progress"
                          : progressWidth > 25
                          ? " completed"
                          : ""
                      }`}
                    >
                      <Icon className={classes.icon}>assignment_ind</Icon>
                    </div>
                    <div
                      className={`check${
                        progressWidth > 25 ? " completed" : ""
                      }`}
                    >
                      <Icon className={classes.icon}>check_circle</Icon>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 3 */}
                    <div
                      className={`step${
                        progressWidth === 50
                          ? " in-progress"
                          : progressWidth > 50
                          ? " completed"
                          : ""
                      }`}
                    >
                      <Icon className={classes.icon}>calendar_today</Icon>
                    </div>
                    <div
                      className={`check${
                        progressWidth > 50 ? " completed" : ""
                      }`}
                    >
                      <Icon className={classes.icon}>check_circle</Icon>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 4 */}
                    <div
                      className={`step${
                        progressWidth === 75
                          ? " in-progress"
                          : progressWidth > 75
                          ? " completed"
                          : ""
                      }`}
                    >
                      <Icon className={classes.icon}>build</Icon>
                    </div>
                    <div
                      className={`check${
                        progressWidth > 75 ? " completed" : ""
                      }`}
                    >
                      <Icon className={classes.icon}>check_circle</Icon>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 5 */}
                    <div
                      className={`step${
                        progressWidth === 100 ? " completed" : ""
                      }`}
                    >
                      <Icon className={classes.icon}>done_all</Icon>
                    </div>
                    <div
                      className={`check${
                        progressWidth === 100 ? " completed" : ""
                      }`}
                    >
                      <Icon className={classes.icon}>check_circle</Icon>
                    </div>
                  </>
                </Grid>
                <Grid md={12} className={classes.progressText}>
                  {" "}
                  {/*Progress Step text layout */}
                  <>
                    {" "}
                    {/*Step 1 - Beginning of tracker, no updated from owner/manager */}
                    <div
                      className={`step-text${
                        progressWidth === 0
                          ? " in-progress"
                          : progressWidth > 0
                          ? " completed"
                          : ""
                      }`}
                    >
                      <p>Sending Work Request...</p>
                    </div>
                    <div
                      className={`check-text${
                        progressWidth > 0 ? " completed" : ""
                      }`}
                    >
                      <p>Work Request Received</p>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 2 */}
                    <div
                      className={`step-text${
                        progressWidth === 25
                          ? " in-progress"
                          : progressWidth > 25
                          ? " completed"
                          : ""
                      }`}
                    >
                      <p>Contacting Vendor...</p>
                    </div>
                    <div
                      className={`check-text${
                        progressWidth > 25 ? " completed" : ""
                      }`}
                    >
                      <p>Vendor Contacted</p>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 3 */}
                    <div
                      className={`step-text${
                        progressWidth === 50
                          ? " in-progress"
                          : progressWidth > 50
                          ? " completed"
                          : ""
                      }`}
                    >
                      <p>Scheduling appointment...</p>
                    </div>
                    <div
                      className={`check-text${
                        progressWidth > 50 ? " completed" : ""
                      }`}
                    >
                      <p>Appointment Scheduled</p>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 4 */}
                    <div
                      className={`step-text${
                        progressWidth === 75
                          ? " in-progress"
                          : progressWidth > 75
                          ? " completed"
                          : ""
                      }`}
                    >
                      <p>Fix in progress...</p>
                    </div>
                    <div
                      className={`check-text${
                        progressWidth > 75 ? " completed" : ""
                      }`}
                    >
                      <p>Work Complete</p>
                    </div>
                  </>
                  <>
                    {" "}
                    {/*Step 5 */}
                    <div
                      className={`step-text${
                        progressWidth === 100 ? " completed" : ""
                      }`}
                    >
                      <p>Issue successfully resolved!</p>
                    </div>
                    <div
                      className={`check-text${
                        progressWidth === 100 ? " completed" : ""
                      }`}
                    >
                      <p>Issue successfully resolved!</p>
                    </div>
                  </>
                </Grid>
              </div>
              <br />
              <button onClick={onButtonClick} />
              Current step: {currentStep}
            </div>
          </div>
        </main>
        {/* </Container> */}
      </d>
    </>
  );
};

export default TenantDashboard;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/styles";
// import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Icon from "@material-ui/core/Icon";
// import Box from "@material-ui/core/Box";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import "./tenantDashboard.css";

// const useStyles = makeStyles({
//   test: {
//     // border: "1px solid black"
//   },

//   links: {
//     textDecoration: "none",
//     color: "black"
//   },
//   dashboard: {
//     marginTop: "3rem"
//   },
//   addLayout: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   addIcon: {
//     color: "lightgrey",
//     "&:hover": {
//       color: "darkblue"
//     }
//   },
// progressBarSection: {
//   marginTop: "2rem"
// },
// progressBar: {
//   flexGrow: 1,
//   height: "1rem",
//   borderRadius: ".5rem"
// },
// progressIcons: {
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginTop: "1rem"
// },
// progressText: {
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between"
// },
// progressContent: {
//   display: "flex",
//   flexDirection: "column"
// },
// icon: {
//   fontSize: "2rem"
// }
// });

// const TenantDashboard = props => {
// const [tenant, setTenant] = useState(null);
// const [property, setProperty] = useState(null);
// const [progressWidth, setProgressWidth] = useState(0);
// const [currentStep, setCurrentStep] = useState(null);
// const classes = useStyles();

// useEffect(() => {
//   axios
//     .get("https://rent-me-app.herokuapp.com/api/users")
//     .then(res => {
//       setTenant(res.data[0]);
//       // console.log(res.data);
//     })
//     .catch(err => console.log("Crap!", err));
//   axios
//     .get("https://rent-me-app.herokuapp.com/api/properties")
//     .then(res => {
//       setProperty(res.data[0]);
//     })
//     .catch(err => console.log("Crap!", err));

//   const steps = [
//     {
//       number: 1,
//       completed: false
//     },
//     {
//       number: 2,
//       completed: false
//     },
//     {
//       number: 3,
//       completed: false
//     },
//     {
//       number: 4,
//       completed: false
//     }
//   ];

//   setCurrentStep(steps[0].number);
// }, []);

// const onButtonClick = event => {
//   setCurrentStep(currentStep + 1);
//   setProgressWidth(currentStep * 25);
// };

//   return (
//     <>
//       <Container>
//         <h1>Tenant Dashboard</h1>
//         <Grid item container spacing={4} className={classes.dashboard}>
//           {" "}
//           {/*Dashboard content */}
//           <Grid item xs={12} md={3}>
//             {" "}
//             {/* side nav containing links to address books and individual manager profiles */}
//             <Card>
//               {" "}
//               {/* address book links */}
//               <CardContent>
//                 <h3>Resources</h3>
//                 <h4>Leasing Documents</h4>
//                 <MenuList>
//                   <MenuItem>
//                     <Link to="/view-receipts" className={classes.links}>
//                       Rent Receipts
//                     </Link>
//                   </MenuItem>
//                   <MenuItem>
//                     <Link to="/view-receipts" className={classes.links}>
//                       Lease Application
//                     </Link>
//                   </MenuItem>
//                   <MenuItem>
//                     <Link to="/view-receipts" className={classes.links}>
//                       Lease Agreement Contract
//                     </Link>
//                   </MenuItem>
//                 </MenuList>
//                 <h4>Tasks & Maintenance</h4>
//                 <MenuList>
//                   <MenuItem>
//                     <Link to="/add-work-request" className={classes.links}>
//                       Submit an Issue/Work Request
//                     </Link>
//                   </MenuItem>
//                 </MenuList>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={9}>
//             <Box mt={-3}>
//               <h3>Property Information</h3>
// <Grid container spacing={4}>
//   <Grid item xs={12} md={6} lg={4}>
//     <Card>
//       <CardContent>
//         <p>Name: {property && property.property_name}</p>
//         <p>Address: {property && property.address}</p>
//       </CardContent>
//     </Card>
//   </Grid>
// </Grid>
//     </Box>
// <div className={classes.progressBarSection}>
//   <h3>Active Service/Work Requests</h3>{" "}
//   {/*ACTIVE SERVICE REQUEST SECTION */}
//   <h4>Name:</h4>
//   <LinearProgress
//     className={classes.progressBar}
//     variant="determinate"
//     value={progressWidth}
//   />
//   <div className={classes.progressContent}>
//     <Grid md={12} className={classes.progressIcons}>
//       {" "}
//       {/*Icon Layout */}
//       <>
//         {" "}
//         {/*Step 1 - Beginning of tracker, no updated from owner/manager */}
//         <div
//           className={`step${
//             progressWidth === 0
//               ? " in-progress"
//               : progressWidth > 0
//               ? " completed"
//               : ""
//           }`}
//         >
//           <Icon className={classes.icon}>home</Icon>
//         </div>
//         <div
//           className={`check${
//             progressWidth > 0 ? " completed" : ""
//           }`}
//         >
//           <Icon className={classes.icon}>check_circle</Icon>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 2  */}
//         <div
//           className={`step${
//             progressWidth === 25
//               ? " in-progress"
//               : progressWidth > 25
//               ? " completed"
//               : ""
//           }`}
//         >
//           <Icon className={classes.icon}>assignment_ind</Icon>
//         </div>
//         <div
//           className={`check${
//             progressWidth > 25 ? " completed" : ""
//           }`}
//         >
//           <Icon className={classes.icon}>check_circle</Icon>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 3 */}
//         <div
//           className={`step${
//             progressWidth === 50
//               ? " in-progress"
//               : progressWidth > 50
//               ? " completed"
//               : ""
//           }`}
//         >
//           <Icon className={classes.icon}>calendar_today</Icon>
//         </div>
//         <div
//           className={`check${
//             progressWidth > 50 ? " completed" : ""
//           }`}
//         >
//           <Icon className={classes.icon}>check_circle</Icon>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 4 */}
//         <div
//           className={`step${
//             progressWidth === 75
//               ? " in-progress"
//               : progressWidth > 75
//               ? " completed"
//               : ""
//           }`}
//         >
//           <Icon className={classes.icon}>build</Icon>
//         </div>
//         <div
//           className={`check${
//             progressWidth > 75 ? " completed" : ""
//           }`}
//         >
//           <Icon className={classes.icon}>check_circle</Icon>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 5 */}
//         <div
//           className={`step${
//             progressWidth === 100 ? " completed" : ""
//           }`}
//         >
//           <Icon className={classes.icon}>done_all</Icon>
//         </div>
//         <div
//           className={`check${
//             progressWidth === 100 ? " completed" : ""
//           }`}
//         >
//           <Icon className={classes.icon}>check_circle</Icon>
//         </div>
//       </>
//     </Grid>
//     <Grid md={12} className={classes.progressText}>
//       {" "}
//       {/*Progress Step text layout */}
//       <>
//         {" "}
//         {/*Step 1 - Beginning of tracker, no updated from owner/manager */}
//         <div
//           className={`step-text${
//             progressWidth === 0
//               ? " in-progress"
//               : progressWidth > 0
//               ? " completed"
//               : ""
//           }`}
//         >
//           <p>Sending Work Request...</p>
//         </div>
//         <div
//           className={`check-text${
//             progressWidth > 0 ? " completed" : ""
//           }`}
//         >
//           <p>Work Request Received</p>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 2 */}
//         <div
//           className={`step-text${
//             progressWidth === 25
//               ? " in-progress"
//               : progressWidth > 25
//               ? " completed"
//               : ""
//           }`}
//         >
//           <p>Contacting Vendor...</p>
//         </div>
//         <div
//           className={`check-text${
//             progressWidth > 25 ? " completed" : ""
//           }`}
//         >
//           <p>Vendor Contacted</p>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 3 */}
//         <div
//           className={`step-text${
//             progressWidth === 50
//               ? " in-progress"
//               : progressWidth > 50
//               ? " completed"
//               : ""
//           }`}
//         >
//           <p>Scheduling appointment...</p>
//         </div>
//         <div
//           className={`check-text${
//             progressWidth > 50 ? " completed" : ""
//           }`}
//         >
//           <p>Appointment Scheduled</p>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 4 */}
//         <div
//           className={`step-text${
//             progressWidth === 75
//               ? " in-progress"
//               : progressWidth > 75
//               ? " completed"
//               : ""
//           }`}
//         >
//           <p>Fix in progress...</p>
//         </div>
//         <div
//           className={`check-text${
//             progressWidth > 75 ? " completed" : ""
//           }`}
//         >
//           <p>Work Complete</p>
//         </div>
//       </>
//       <>
//         {" "}
//         {/*Step 5 */}
//         <div
//           className={`step-text${
//             progressWidth === 100 ? " completed" : ""
//           }`}
//         >
//           <p>Issue successfully resolved!</p>
//         </div>
//         <div
//           className={`check-text${
//             progressWidth === 100 ? " completed" : ""
//           }`}
//         >
//           <p>Issue successfully resolved!</p>
//         </div>
//       </>
//     </Grid>
//   </div>
//   <br />
//   <button onClick={onButtonClick} />
//   Current step: {currentStep}
// </div>
//   </Grid>
// </Grid>
//       </Container>
//     </>
//   );
// };

// export default TenantDashboard;
