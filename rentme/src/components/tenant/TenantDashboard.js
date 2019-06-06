import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const TenantDashboard = props => {
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
    </>
  );
};

export default TenantDashboard;
