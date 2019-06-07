import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PropertyDash = props => {
  let [property, setProperty] = useState(null)

  // logOut = e => {
  //     e.preventDefault();
  //     localStorage.removeItem("token");
  //     this.props.history.push("/login");
  // };

  useEffect(() => {
    axios
      .get('https://rent-me-app.herokuapp.com/api/properties')
      .then(res => {
        setProperty(res.data[0])
      })
      .catch(err => console.log('Crap!', err))
  }, [])

  return (
    <>
      <h2>Property Owner Dashboard</h2>

      <Link to="vendor-addbook">Vendor Address Book</Link>
      <Link to="tenant-addbook">Tenant Address Book</Link>
      <Link to="add-manager">
        <button>Add a Manager</button>
        {/* this button should be a plus icon */}
      </Link>
      <h4>Properties:</h4>
      <p>Name: {property && property.property_name}</p>
      <p>Address: {property && property.address}</p>
    </>
  )
}

export default PropertyDash
