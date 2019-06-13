import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  test: {
    // border: "1px solid black"
  },

  links: {
    textDecoration: "none",
    color: "black"
  },
  dashboard: {
    marginTop: "3rem"
  },
  addLayout: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  addIcon: {
    color: "lightgrey",
    "&:hover": {
      color: "darkblue"
    },
    marginRight: "1rem"
  }
});

const PropertyDash = props => {
  const [properties, setProperties] = useState([]);
  const classes = useStyles();

  // logOut = e => {
  //     e.preventDefault();
  //     localStorage.removeItem("token");
  //     this.props.history.push("/login");
  // };

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/properties")
      .then(res => {
        setProperties(res.data);
        // console.log(res.data);
      })
      .catch(err => console.log("Crap!", err));
  }, []);

  return (
    <>
      <Container>
        <h1>Property Owner Dashboard</h1>
        <Grid item container spacing={4} className={classes.dashboard}>
          {" "}
          {/*Dashboard content */}
          <Grid item xs={12} md={3}>
            {" "}
            {/* side nav containing links to address books and individual manager profiles */}
            <Card>
              {" "}
              {/* address book links */}
              <CardContent>
                <h3>Address Books</h3>
                <MenuList>
                  <MenuItem>
                    <Link to="/vendor-addbook" className={classes.links}>
                      Vendor Address Book
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/tenant-addbook" className={classes.links}>
                      Tenant Address Book
                    </Link>
                  </MenuItem>
                </MenuList>
              </CardContent>
            </Card>
            <Box mt={4}>
              <div className={classes.addLayout}>
                <Link to="/add-property">
                  <Icon className={classes.addIcon} fontSize="large">
                    add_circle
                  </Icon>
                </Link>
                <h3>Add Property</h3>
              </div>
            </Box>
            {/* <Box mt={4}>
              <Card>
                <CardContent>
                  <div className={classes.addLayout}>
                    <h3>Managers</h3>
                    <Link to="/add-manager">
                      <Icon className={classes.addIcon} fontSize="large">
                        add_circle
                      </Icon>
                    </Link>
                  </div>
                  <MenuList>
                    {managers.map(manager => {
                      return (
                        <MenuItem>
                          <Link
                            to={`/manager-profile/${manager.id}`}
                            className={classes.links}
                          >
                            <p>
                              {manager.First_name} {manager.Last_name}
                            </p>
                          </Link>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </CardContent>
              </Card>
            </Box> */}
          </Grid>
          <Grid item xs={12} md={9} className={classes.test}>
            {" "}
            {/* list of owner's properties */}
            <Box mt={-3}>
              <h3>Properties</h3>
              <Grid container spacing={4}>
                {properties.map(property => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      key={property && property.id}
                    >
                      <Link to={`/property-card/${property.id}`}>
                        <Card>
                          <CardContent>
                            <p>Name: {property && property.property_name}</p>
                            <p>Address: {property && property.address}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PropertyDash;
