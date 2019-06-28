import React, { useEffect } from "react"
import Typography from "@material-ui/core/Typography";

const IssueResolvedText = props => {
  const { resolved_owner, resolved_tenant} = props.request

  return (
    <>
      {resolved_tenant && !resolved_owner ?
       <Typography style={{margin: "0 auto"}}>
         Issue Resolved: Waiting for landlord approval.
       </Typography>
       :
       ""
     }
    </>
  )
}

 export default IssueResolvedText
