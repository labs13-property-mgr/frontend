import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";

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


export const CheckProgress = props => {
  const classes = useStyles()
  const {checkAgainst, progressWidth, type } = props
  return (
    <div className={`${type ? "check-text" : "check"}${progressWidth > checkAgainst || progressWidth === 100 ? " completed" : ""}`}>
      <Icon className={classes.icon}>check_circle</Icon>
    </div>
  )
}

export const isGreaterOrIsEqual = (num1, num2, varText) => {

  if(num1 > num2) {
    return `${varText ? varText : "step"} completed`
  } else if(num1 === num2) {
    return `${varText} in-progress`
  } else {
    return varText
  }
}
