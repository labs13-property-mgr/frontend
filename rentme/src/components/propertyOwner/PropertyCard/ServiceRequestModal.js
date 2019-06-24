import React, {useState, useEffect} from "react"
import ServiceRequestForm from './ServiceRequestForm'

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    textAlign: "center",
    outline: 'none',
    margin: "0 auto"
  },

  formContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const ServiceRequestModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const classes = useStyles();

  const handleClick = () => {
    setModalOpen(!modalOpen)
  }


  return (
     <div>
      <Button onClick={handleClick}>Open Request</Button>
      <Modal
        aria-labelledby="Edit service request form"
        aria-describedby="Form for editing service request"
        open={modalOpen}
        onClose={handleClick}
      >
        <div className={`${classes.formContainer}`}>
          <div className={classes.form}>
            <ServiceRequestForm />
          </div>
        </div>
      </Modal>
     </div>
  )
}

 export default ServiceRequestModal
