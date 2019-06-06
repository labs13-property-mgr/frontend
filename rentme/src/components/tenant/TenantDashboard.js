import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

const TenantDashboard = props => {
  let [ user, setUser ] = useState(null)

  useEffect(() => {
    axios.get("https://rent-me-app.herokuapp.com/api/users")
    .then(res => {
      setUser(res.data[0])
    })
    .catch(console.log("Error"))
  }, [])


  return (
    <>
      <Link to="/view-receipts">Rent Receipts</Link>
      <Link to="/issue-report">Report an issue</Link>
      <p>Name: {user && user.First_name + " " + user.Last_name}</p>
      <p>Role: {user && user.role}</p>
    </>
  )
};

export default TenantDashboard
