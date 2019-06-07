import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class PropertyDash extends React.Component {
  state = {};

  // logOut = e => {
  //     e.preventDefault();
  //     localStorage.removeItem("token");
  //     this.props.history.push("/login");
  // };

  render() {
    return (
      <>
        <h1>Property Owner Dashboard</h1>
        <List>
          <ListItemLink href="/vendor-addbook">
            <ListItemText primary="Vendor Address Book" />
          </ListItemLink>
        </List>
        <List>
          <ListItemLink href="/tenant-addbook">
            <ListItemText primary="Tenant Address Book" />
          </ListItemLink>
        </List>
        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          href="/add-manager"
        >
          Add a Manager
        </Button>
      </>
    );
  }
}

export default PropertyDash;
