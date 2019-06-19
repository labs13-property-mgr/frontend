import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
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
