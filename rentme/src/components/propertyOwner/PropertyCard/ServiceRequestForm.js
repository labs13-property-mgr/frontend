import React, { useState, useEffect } from "react";
import SuccessText from "./SuccessText";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DescriptionModal from "./DescriptionModal";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formContainer: {
    display: "grid",
    height: "100%",
    width: "100%",
    gridTemplateColumns: " 6fr 6fr 6fr 4fr 4fr 4fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 3fr 3fr 1fr",
    gridGap: "10px"
  }
});

//generates grid column, row and alignments for grid item placements
//also takes an object containing any other styles you may want as the last argument
const generateGridValues = (
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,
  styles
) => {
  return {
    gridColumnStart: `${columnStart}`,
    gridColumnEnd: `${columnEnd}`,
    gridRowStart: `${rowStart}`,
    gridRowEnd: `${rowEnd}`,
    alignSelf: "center",
    ...styles
  };
};

const ServiceRequestForm = props => {
  const {
    request_name,
    notes,
    cost,
    date_created,
    id,
    appointment,
    received,
    resolved_owner,
    resolved_tenant,
    request_description
  } = props.request;

  const [requestStatus, setStatus] = useState("");

  const [open, setOpen] = useState(false);

  const [requestUpdated, setRequestUpdated] = useState(false);

  const [values, setValues] = useState({
    appointment: "",
    notes: "",
    cost: ""
  });

  useEffect(() => {
    setValues({
      ...values,
      cost: cost,
      notes: notes,
      appointment: appointment
    });
    setStatus(props.request.status);
    triggerReceived();
  }, []);

  const classes = useStyles();

  const handlePopup = () => {
    setOpen(!open);
  };

  const triggerReceived = e => {
    if (!received) {
      axios
        .put(`https://rent-me-app.herokuapp.com/api/service/${id}`, {
          received: true
        })
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const triggerResolved = e => {
    if (!resolved_owner) {
      axios
        .put(`https://rent-me-app.herokuapp.com/api/service/${id}`, {
          resolved_owner: true
        })
        .then(res => {
          setRequestUpdated(true);
          setTimeout(() => setRequestUpdated(false), 3500);
        })
        .then(() => {
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleDropdown = e => {
    setStatus(e.target.value);
  };

  const handleChanges = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let status = requestStatus;
    let updatedValues = { ...values, status };
    return axios
      .put(`https://rent-me-app.herokuapp.com/api/service/${id}`, updatedValues)
      .then(res => {
        setRequestUpdated(true);
        setTimeout(() => setRequestUpdated(false), 3500);
      })
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <form className={classes.formContainer} onSubmit={e => handleSubmit(e)}>
        <TextField
          variant="outlined"
          label="Name"
          defaultValue={request_name}
          InputProps={{
            readOnly: true
          }}
          style={generateGridValues(1, 5, 1, 1)}
        />
        <FormControl required style={generateGridValues(5, 7, 1, 1)}>
          <InputLabel>Request Status</InputLabel>
          <Select
            name="status"
            value={requestStatus}
            onChange={e => handleDropdown(e)}
          >
            <MenuItem value="vendor contacted">Vendor Contacted</MenuItem>

            <MenuItem value="scheduled">Scheduled</MenuItem>

            <MenuItem value="fixing">Fixing</MenuItem>
          </Select>
        </FormControl>
        <Typography style={generateGridValues(1, 3, 2, 2)}>
          Date Reported: {date_created}
        </Typography>
        <TextField
          id="date"
          label="Appointment Date"
          type="date"
          value={values.appointment ? values.appointment : date_created}
          name="appointment"
          onChange={e => handleChanges(e)}
          style={generateGridValues(2, 6, 4, 4)}
        />
        <Button
          style={generateGridValues(3, 5, 5, 5, {
            background: "DeepSkyBlue",
            color: "white"
          })}
          onClick={() => handlePopup()}
        >
          Description
        </Button>
        <DescriptionModal
          open={open}
          request_description={request_description}
          handleOpen={handlePopup}
        />
        <TextField
          id="notes"
          label="Notes"
          variant="outlined"
          value={values.notes}
          name="notes"
          onChange={e => handleChanges(e)}
          style={generateGridValues(2, 6, 6, 6)}
        />
        <div style={generateGridValues(2, 6, 7, 7)}>
          <Tooltip title="Update request">
            <Button type="submit">Submit</Button>
          </Tooltip>
          <Tooltip title="Resolve request">
            <Button onClick={e => triggerResolved(e)}>Resolve</Button>
          </Tooltip>
          <SuccessText isTriggered={requestUpdated} />
        </div>
      </form>
    </>
  );
};

export default ServiceRequestForm;
