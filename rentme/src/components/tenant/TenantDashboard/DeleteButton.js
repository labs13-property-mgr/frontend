import React, {useState, useEffect} from "react"
import Button from "@material-ui/core/Button";

const DeleteButton = props => {
  const { resolved_tenant, resolved_owner, id } = props.request
  const { handleDeleteRequest } = props

  return (
    <>
      {resolved_tenant && resolved_owner ?
        <Button color="primary" onClick={() => handleDeleteRequest(id)}>
          <i class="material-icons">
            delete_forever
          </i>
        </Button>
        :
        ""
      }
    </>
  )
}

 export default DeleteButton
