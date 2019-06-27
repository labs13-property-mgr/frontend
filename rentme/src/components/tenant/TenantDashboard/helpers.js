import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

import Icon from "@material-ui/core/Icon";

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
  },
  h1: {
    fontSize: "2.4rem",
    marginBottom: "2rem",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  paperCard: {
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
    zIndex: 1,
    marginBottom: "3rem"
  },
  propertyInfo: {
    marginBottom: ".5rem",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  otherTenantNames: {
    fontWeight: 500
  },
  paperContent: {
    padding: "1rem"
  }
}));

export const CheckProgress = props => {
  const classes = useStyles();
  const { checkAgainst, progressWidth, type } = props;
  return (
    <div
      className={`${type ? "check-text" : "check"}${
        progressWidth > checkAgainst || progressWidth === 100
          ? " completed"
          : ""
      }`}
    >
      <Icon className={classes.icon}>check_circle</Icon>
    </div>
  );
};

export const isGreaterOrIsEqual = (num1, num2, varText) => {
  if (num1 > num2) {
    return `${varText ? varText : "step"} completed`;
  } else if (num1 === num2) {
    return `${varText} in-progress`;
  } else {
    return varText;
  }
};
