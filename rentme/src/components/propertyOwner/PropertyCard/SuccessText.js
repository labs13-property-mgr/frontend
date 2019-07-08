import React from "react"

const SuccessText = props => {

  const { isTriggered } = props

  if(!isTriggered) return null
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
      <i class="material-icons">
      check_circle_outline
      </i>
      <span>Request Updated</span>
    </div>
  )
}

 export default SuccessText
