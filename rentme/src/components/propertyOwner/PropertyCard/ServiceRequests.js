import React, {useState, useEffect} from "react"
import ServiceRequest from './ServiceRequest'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    width: "75%",
    justifyContent: "space-around",
    flexWrap: "wrap",
    margin: "0 auto"
  }
})


const ServiceRequests = () => {

  const [ requests, setRequests ] = useState("")
  const classes = useStyles()

  useEffect(() => {
    axios.get("https://rent-me-app.herokuapp.com/api/service")
    .then(res => {
      setRequests(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className={classes.cardContainer}>
      {requests && requests.map(request => {
        return <ServiceRequest request={request} />
      })}

    </div>
  )
}

 export default ServiceRequests
