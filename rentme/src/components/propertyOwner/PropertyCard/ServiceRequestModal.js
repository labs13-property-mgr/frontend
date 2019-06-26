import React, {useState, useEffect} from "react"
import ServiceRequestForm from './ServiceRequestForm'

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    textAlign: "center",
    margin: "0 auto",
    width: "100%",
  },

  formContainer: {
    width: "50%",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    marginTop: "80px"
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const ServiceRequestModal = props => {
  const [modalOpen, setModalOpen] = useState(false)
  const classes = useStyles();

  const handleClick = () => {
    setModalOpen(!modalOpen)
  }

  const { request_name } = props.request
  return (
     <div>
      <Button onClick={handleClick}>{request_name}</Button>
      <Modal
        aria-labelledby="Edit service request form"
        aria-describedby="Form for editing service request"
        open={modalOpen}
        onClose={handleClick}
      >
        <div className={`${classes.formContainer}`}>
          <div className={classes.form}>
            <ServiceRequestForm request={props.request}/>
          </div>
        </div>
      </Modal>
     </div>
  )
}

 export default ServiceRequestModal
