import React, {useState, useEffect} from "react"
import ServiceRequest from './ServiceRequest'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    width: "75%",
    justifyContent: "space-around",
    flexWrap: "wrap"
  }
})


const ServiceRequests = () => {

  const classes = useStyles()

  return (
    <div className={classes.cardContainer}>
      <ServiceRequest />
      <ServiceRequest />
      <ServiceRequest />
      <ServiceRequest />

    </div>
  )
}

 export default ServiceRequests
