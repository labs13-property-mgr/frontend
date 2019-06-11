import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import * as ROUTES from '../../../constants/routes';

//function ListItemLink(props) {
  //return <ListItem button component="a" {...props} />;
//}

const TenantDashboard = props => {
  let [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/users")
      .then(res => {
        setUser(res.data[0]);
      })
      .catch(console.log("Error"));
  }, []);

  return (
    <>
      <List>
        <Link to={ROUTES.RENT_RECEIPTS}>
          <ListItemText primary="Rent Receipts" />
        </Link>
      </List>
      <List>
        <Link to={ROUTES.ISSUE_FORM}>
          <ListItemText primary="Report an issue" />
        </Link>
      </List>
      <p>Name: {user && user.First_name + " " + user.Last_name}</p>
      <p>Role: {user && user.role}</p>
    </>
  );
};

export default TenantDashboard;
