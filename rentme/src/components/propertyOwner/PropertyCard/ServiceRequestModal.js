import React, { useState, useEffect } from "react";
import ServiceRequestForm from "./ServiceRequestForm";

import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    textAlign: "center",
    margin: "0 auto",
    width: "100%"
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
    alignItems: "center",
    "&:hover": {
      cursor: "pointer"
    }
  },
  tooltip: {
    fontSize: "2rem"
  },
  title: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  needToView: {
    fontSize: ".9rem",
    color: "#b71c1c",
    fontWeight: "bold"
  },
  needApproval: {
    fontSize: ".9rem",
    color: "#ff9800",
    fontWeight: "bold"
  },
  complete: {
    fontSize: ".9rem",
    color: "#2e7d32",
    fontWeight: "bold"
  }
}));

const ServiceRequestModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();
  const [isReceived, setIsReceived] = useState(false);
  const [isResolvedOwner, setIsResolvedOwner] = useState(false);
  const [isResolvedTenant, setIsResolvedTenant] = useState(false);

  const handleClick = () => {
    setModalOpen(!modalOpen);

    setIsReceived(true);
  };

  const { handleGetRequests, request } = props;
  const {
    body,
    status,
    resolved_tenant,
    resolved_owner,
    received
  } = request;

  useEffect(() => {
    setIsReceived(received);
    setIsResolvedOwner(resolved_owner);
    setIsResolvedTenant(resolved_tenant);

    handleGetRequests();
  }, [props.request]);

  return (
    <div className={classes.center}>
      <div className={classes.content} onClick={handleClick}>
        <div className={classes.title}>
          <Typography variant="h6">{body}</Typography>
          <Tooltip
            // className={classes.tooltip}
            title={
              !isReceived
                ? "The request has not been viewed"
                : isResolvedOwner && !isResolvedTenant
                ? "Tenant approval to close issue still pending"
                : isResolvedOwner && isResolvedTenant
                ? "The request was completely resolved"
                : ""
            }
          >
            <p>
              {!isReceived ? (
                <i className="material-icons">assignment_late</i>
              ) : isResolvedOwner && !isResolvedTenant ? (
                <i className="material-icons">timer</i>
              ) : isResolvedOwner && isResolvedTenant ? (
                <i className="material-icons">assignment_turned_in</i>
              ) : (
                ""
              )}
            </p>
          </Tooltip>
        </div>
        <p>
          Status:{" "}
          {isResolvedOwner && isResolvedTenant
            ? "Complete"
            : isResolvedOwner && !isResolvedTenant
            ? "Incomplete"
            : `${status}`}
        </p>
        <p>
          {!isReceived ? (
            <div className={classes.needToView}>
              You haven't viewed this request yet.
            </div>
          ) : isResolvedOwner && !isResolvedTenant ? (
            <div className={classes.needApproval}>
              The tenant hasn't closed this ticket yet. Please contact to
              resolve.
            </div>
          ) : isResolvedOwner && isResolvedTenant ? (
            <div className={classes.complete}>The request is fully closed.</div>
          ) : (
            ""
          )}
        </p>
      </div>
      <Modal
        aria-labelledby="Edit service request form"
        aria-describedby="Form for editing service request"
        open={modalOpen}
        onClose={handleClick}
      >
        <div className={`${classes.formContainer}`}>
          <div className={classes.form}>
            <ServiceRequestForm request={props.request} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceRequestModal;
