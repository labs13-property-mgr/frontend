import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

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
        <ListItemLink href="/view-receipts">
          <ListItemText primary="Rent Receipts" />
        </ListItemLink>
      </List>
      <List>
        <ListItemLink href="/issue-report">
          <ListItemText primary="Report an issue" />
        </ListItemLink>
      </List>
      <p>Name: {user && user.First_name + " " + user.Last_name}</p>
      <p>Role: {user && user.role}</p>
    </>
  );
};

export default TenantDashboard;
<<<<<<< HEAD
=======

>>>>>>> 7fbe657acfb290f0c9b534b2b6ac1903f5b6b648
