import React, {useState, useEffect} from "react"
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  descriptionCard: {
    width: "50%",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    marginTop: "160px",
    backgroundColor: theme.palette.background.paper,
    padding: "10px",
    boxShadow: theme.shadows[3],
  },
}))

const DescriptionModal = props => {
  let { open, handleOpen, request_description } = props

  const classes = useStyles()

  return (
    <Modal
       aria-labelledby="Description popup"
       aria-describedby="Shows request description"
       open={open}
       onClose={handleOpen}
     >
       <div className={classes.descriptionCard}>
         <p>
           {request_description}
         </p>
       </div>
     </Modal>
  )
}

 export default DescriptionModal
