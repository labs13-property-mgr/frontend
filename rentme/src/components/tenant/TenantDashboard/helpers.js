import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
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
