import React, {useState, useEffect} from "react"
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formContainer: {
    display: "grid",
    height: "100%",
    width: "100%",
    gridTemplateColumns:" 6fr 6fr 6fr 4fr 4fr 4fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 3fr 1fr",
    gridGap: "10px"
  },

})

const generateGridValues = (columnStart, columnEnd, rowStart, rowEnd, ...args) => {
  return {
    gridColumnStart: `${columnStart}`,
    gridColumnEnd: `${columnEnd}`,
    gridRowStart: `${rowStart}`,
    gridRowEnd: `${rowEnd}`,
    alignSelf: "center",
  }
}

const ServiceRequestForm = props => {
  const { name, status, vendor, date_submitted, } = props

  const [ requestStatus, setStatus ] = useState("open")

  const [ values, setValues ] = useState({
    vendor_name: "",
    vendor_phone: "",
    scheduled_date: "",
    notes: ""
  })

  const classes = useStyles()

  const handleDropdown = e => {
    setStatus(e.target.value)
    console.log(requestStatus)
  }

  const handleChanges = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }
  return (
    <>

    <form className={classes.formContainer}>
      <TextField
        variant="outlined"
        label="Name"
        defaultValue="Request Name"
        InputProps={{
          readOnly:true
        }}
        style={generateGridValues(1, 5, 1, 1)}
      />
      <FormControl required style={generateGridValues(5, 7, 1, 1)}>
          <InputLabel
          >
            Request Status
          </InputLabel>
          <Select
            name="status"
            value={requestStatus}
            onChange={e => handleDropdown(e)}
          >
            <MenuItem value="vendor contacted">
              Vendor Contacted
            </MenuItem>

            <MenuItem value="scheduled">
              Scheduled
            </MenuItem>

            <MenuItem value="fixing">
              Fixing
            </MenuItem>
          </Select>
      </FormControl>
      <Typography style={generateGridValues(1, 3, 2, 2)}>Date Reported: </Typography>
      <FormControl style={generateGridValues(1, 7, 3, 3)}>
        <div >
          <span>Assigned To: </span>
          <div>
            <TextField
              variant="outlined"
              label="Vendor Name"
              name="vendor_name"
              onChange={e => handleChanges(e)}
              value={values.vendor_name}
              style={{margin: "3px"}}
            />
            <TextField
              variant="outlined"
              label="Vendor Phone"
              name="vendor_phone"
              onChange={e => handleChanges(e)}
              value={values.vendor_phone}
              style={{margin: "3px"}}

            />
          </div>
        </div>
      </FormControl>
      <TextField
        id="date"
        label="Scheduled Date"
        type="date"
        value={values.scheduled_date.length > 0 && values.scheduled_date}
        name="scheduled_date"
        onChange={e => handleChanges(e)}
        style={generateGridValues(2, 6, 4, 4)}
      />
      <TextField
        id="notes"
        label="Notes"
        variant="outlined"
        fullWidth
        value={values.notes}
        name="notes"
        onChange={e => handleChanges(e)}
        style={generateGridValues(1, 7, 5, 6)}
      />
      <Button style={generateGridValues(2, 6, 6, 6)}>Submit</Button>
    </form>
    </>
  )
}

 export default ServiceRequestForm
