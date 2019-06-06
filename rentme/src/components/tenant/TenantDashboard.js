import React, { useState } from "react";
import { Link } from 'react-router-dom'

const TenantDashboard = props => {
  return (
    <>
      <Link to="/view-receipts">Rent Receipts</Link>
      <Link to="/issue-report">Report an issue</Link>
    </>
  )
};

export default TenantDashboard
