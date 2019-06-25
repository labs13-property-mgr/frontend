import React, {useState, useEffect} from "react"
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const ServiceRequestForm = props => {
  const { name, status, vendor, date_submitted, } = props

  const [ requestStatus, setStatus ] = useState("open")

  const [ values, setValues ] = useState({
    vendor_name: "",
    vendor_phone: "",
    scheduled_date: "",
    notes: ""
  })

  const handleDropdown = e => {
    setStatus(e.target.value)
    console.log("Event", e)
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

    <form>
      <TextField
        variant="outlined"
        label="Name"
        defaultValue="Request Name"
        InputProps={{
          readOnly:true
        }}
      />
      <FormControl required>
          <InputLabel
          >
            Status
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
      <Typography>Reported: -Date here</Typography>
      <FormControl>
        <div>
          <span>Assigned To: </span>
          <div>
            <TextField
              variant="outlined"
              label="Vendor Name"
              name="vendor_name"
              onChange={e => handleChanges(e)}              value={values.vendor_name}
            />
            <TextField
              variant="outlined"
              label="Vendor Phone"
              name="vendor_phone"
              onChange={e => handleChanges(e)}
              value={values.vendor_phone}
            />
          </div>
        </div>
      </FormControl>
      <TextField
        id="date"
        label="Scheduled Date"
        type="date"
        defaultValue="2019-06-24"
        value={values.scheduled_date}
        name="scheduled_date"
        onChange={e => handleChanges(e)}

      />
      <TextField
        id="notes"
        label="Notes"
        variant="outlined"
        fullWidth
        value={values.notes}
        name="notes"
        onChange={e => handleChanges(e)}
      />
      <Button>Submit</Button>
    </form>
    </>
  )
}

 export default ServiceRequestForm
