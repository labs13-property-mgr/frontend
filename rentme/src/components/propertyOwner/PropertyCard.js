import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const PropertyCard = props => {
  return (
    <>
      <h1>Property Card</h1>
      <Button
        type="submit"
        size="medium"
        variant="contained"
        color="primary"
        href="/tenant-form"
      >
        Add a Tenant
      </Button>
    </>
  );
};

export default PropertyCard;
