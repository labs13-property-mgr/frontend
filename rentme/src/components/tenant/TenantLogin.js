import React from 'react'
import { Link } from 'react-router-dom';

const TenantLogin = props => {
  return (
    <>
      <h1>Sign in as renter</h1>
      <Link to="/tenant-dash">
        <button>Tenant Sign In</button>
      </Link>
    </>
  )

}

export default TenantLogin
