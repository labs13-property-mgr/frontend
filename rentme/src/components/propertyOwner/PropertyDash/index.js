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
  }
}));

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const PropertyDash = props => {
  const { container } = props;
  const [properties, setProperties] = useState([]);
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
        <List>
          <ListItemLink className={classes.menuItem} href="/vendor-addbook">
            <Icon fontSize="medium">contacts</Icon>
            <p className={classes.menuText}>Vendor Address Book</p>
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/tenant-addbook">
            <Icon fontSize="medium">contacts</Icon>
            <p className={classes.menuText}>Tenant Address Book</p>
          </ListItemLink>
        </List>
        <Divider />
        <List>
          <ListItemLink className={classes.menuItem} href="/add-property">
            <Icon fontSize="medium">add_location</Icon>
            <p className={classes.menuText}>Add Property</p>
          </ListItemLink>
        </List>
      </div>
    </div>
  );

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/properties")
      .then(res => {
        setProperties(res.data);
        // console.log(res.data);
      })
      .catch(err => console.log("Crap!", err));
  }, []);

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
            <h1>Property Owner Dashboard</h1>
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
            <h1>Property Owner Dashboard</h1>
            {/*Dashboard content */} {/* list of owner's properties */}
            <h2>Properties</h2>
            <Grid container className={classes.propertyCards} spacing={4}>
              {properties.map(property => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={property && property.id}
                  >
                    <Link to={`/property-card/${property.id}`}>
                      <Card className={classes.cardStyle}>
                        <CardContent>
                          <p>Name: {property && property.property_name}</p>
                          <p>Address: {property && property.address}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </main>
        {/* </Container> */}
      </d>
    </>
  );
};

export default PropertyDash;
