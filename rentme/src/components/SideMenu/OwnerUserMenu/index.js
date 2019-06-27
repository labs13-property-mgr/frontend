import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

import ZillowWidget from "../ZillowWidget";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  headerPlusSearch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  dashboardSearch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  searchInput: {
    border: "none",
    borderBottom: "1px solid black",
    fontSize: "1.2rem",
    "&:focus": {
      outline: "none"
    }
  },

  hide: {
    opacity: 0,
    pointerEvents: "none"
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "flex-end"
  },
  mainContainer: {
    display: "block"
  },

  test: {
    // border: "1px solid black"
  },
  propertyCards: {
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
    color: "white",
    opacity: 0.8,
    transition: "opacity 300ms ease",
    "&:hover": {
      color: "white",
      opacity: 1,
      fontWeight: "bold"
      // backgroundColor: "#008c3a"
    },
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem"
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
    marginTop: "1rem",
    fontSize: "1.2rem",
    paddingBottom: "1rem",
    fontWeight: 300
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
    // backgroundColor: ""
    backgroundImage:
      "linear-gradient(to top, #7cba8b, #00aa9d, #0094b8, #0078c7, #3f51b5)",
    color: "white"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: drawerWidth
    }
  },
  menuSection: {
    marginTop: "1.5rem"
  },
  menuItemZillow: {
    display: "flex",
    flexDirection: "column"
  },
  titleSection: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "-1.5rem",
    marginBottom: ".5rem"
  },
  widgetTitle: {
    marginLeft: "1rem",
    fontSize: "1rem"
  }
}));

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const OwnerUserMenu = props => {
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
        <List className={classes.menuSection}>
          <ListItemLink className={classes.menuItem} href="/owner-dash">
            <Icon fontSize="medium">home</Icon>
            <Typography variant="body1" className={classes.menuText}>
              Dashboard
            </Typography>
            {/* <Icon fontSize="medium">home</Icon>
            <p className={classes.menuText}>Dashboard</p> */}
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/vendor-addbook">
            <Icon fontSize="medium">contacts</Icon>
            <Typography variant="body1" className={classes.menuText}>
              Vendor Address Book
            </Typography>
            {/* <p className={classes.menuText}>Vendor Address Book</p> */}
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/tenant-addbook">
            <Icon fontSize="medium">contacts</Icon>
            <Typography variant="body1" className={classes.menuText}>
              Tenant Address Book
            </Typography>
            {/* <p className={classes.menuText}>Tenant Address Book</p> */}
          </ListItemLink>
        </List>
        <Divider />
        <List className={classes.menuSection}>
          <ListItemLink className={classes.menuItem} href="/add-property">
            <Icon fontSize="medium">add_location</Icon>
            <Typography variant="body1" className={classes.menuText}>
              Add Property
            </Typography>
            {/* <p className={classes.menuText}>Add Property</p> */}
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/add-tenant">
            <Icon fontSize="medium">group_add</Icon>
            <Typography variant="body1" className={classes.menuText}>
              Add Tenants
            </Typography>
            {/* <p className={classes.menuText}>Add Tenants</p> */}
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/add-vendor">
            <Icon fontSize="medium">group_add</Icon>
            <Typography variant="body1" className={classes.menuText}>
              Add Vendors
            </Typography>
            {/* <p className={classes.menuText}>Add Vendors/Service Providers</p> */}
          </ListItemLink>
        </List>
        <Divider />
        <Typography variant="subtitle1" className={classes.resourcesHeader}>
          Owner Resources
        </Typography>
        <ListItem className={classes.menuItemZillow}>
          <div className={classes.titleSection}>
            <Icon fontSize="medium">info</Icon>
            <Typography variant="subtitle2" className={classes.widgetTitle}>
              Get Property Info
            </Typography>
          </div>
          <ZillowWidget />
        </ListItem>
      </div>
    </div>
  );

  return (
    <>
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
    </>
  );
};

export default OwnerUserMenu;
