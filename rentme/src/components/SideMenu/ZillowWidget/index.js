import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import ZillowLogo from "../../img/zillow-logo.png";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  widgetContainer: {
    margin: ".2rem"
  },
  zillowWidget: {
    // border: "2px solid black",
    backgroundColor: "white",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  zillowLogo: {
    width: "120px"
  },
  iframe: {
    filter: "brightness(1.5)",
    width: "100%",
    height: 50,
    // border: "1px solid #3F51B5",
    // boxShadow: "-8px -8px 12px -12px rgba(28,25,28,1)",
    borderRadius: "5px",
    // paddingTop: ".5rem",
    marginLeft: "-.2rem"
  },
  descriptionText: {
    fontSize: ".8rem",
    padding: ".6rem"
  }
}));

const ZillowWidget = props => {
  const { container } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.widgetContainer}>
        <Card
          className={classes.zillowWidget}
          // style={{
          //   width: "239px",
          //   overflow: "hidden",
          //   backgroundColor: "#e7f1fd",
          //   color: "#555",
          //   font: "normal normal normal 13px verdana,arial,sans-serif",
          //   lineHeight: "13px",
          //   margin: "0 auto",
          //   padding: 0,
          //   textAlign: "center",
          //   border: "1px solid #adcfff",
          //   letterSpacing: 0,
          //   textTransform: "none"
          // }}
        >
          <a href="https://www.zillow.com/" target="_blank" rel="nofollow">
            <img
              alt="Zillow Real Estate Information"
              className={classes.zillowLogo}
              src={ZillowLogo}
            />
          </a>
          <Typography variant="body2" className={classes.descriptionText}>
            Enter your property's address to get Zestimate valuations and more.
          </Typography>
          <iframe
            className={classes.iframe}
            scrolling="no"
            src="https://www.zillow.com/widgets/search/LargeSearchBoxWidget.htm?did=zillow-large-search-box-iframe-widget&type=iframe&rgname=Seattle+WA&shvi=no"
            frameBorder={0}
          />
        </Card>
      </div>
    </>
  );
};

export default ZillowWidget;
