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

const TenantCard = props => {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/users")
      .then(res => {
        setTenant(
          res.data
            .filter(tenant => tenant.role === "tenant")
            .find(tenant => `${tenant.id}` === props.match.params.id)
        );
        // console.log(res.data);
      })
      .catch(err => console.log("Crap!", err));
  }, []);

  return (
    <div>
      <Container>
        <h1>{tenant && tenant.First_name}'s Profile</h1>
        <div>
          <h2>Personal & Contact Information</h2>
          <Grid container>
            <Grid item md={6}>
              <p>
                Name: {tenant && tenant.First_name} {tenant && tenant.Last_name}
              </p>
              <p>Email: {tenant && tenant.email}</p>
              <p>Phone: {tenant && tenant.address}</p>
              <p>Address: {tenant && tenant.address}</p>
            </Grid>
          </Grid>
        </div>
      </Container>
      <hr />
    </div>
  );
};

export default TenantCard;
