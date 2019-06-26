import React, {useState, useEffect} from "react"
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'

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

//generates grid column, row and alignments for grid item placements
const generateGridValues = (columnStart, columnEnd, rowStart, rowEnd) => {
  return {
    gridColumnStart: `${columnStart}`,
    gridColumnEnd: `${columnEnd}`,
    gridRowStart: `${rowStart}`,
    gridRowEnd: `${rowEnd}`,
    alignSelf: "center",
  }
}

const ServiceRequestForm = props => {
  const { request_name, notes, date_created, id, appointment, received } = props.request

  const [ requestStatus, setStatus ] = useState("")

  const [ values, setValues ] = useState({
    appointment: "",
    notes: ""
  })

  useEffect(() => {
    setValues({
      ...values,
      notes: notes,
      appointment: appointment
    })
    setStatus(props.request.status)
    triggerReceived()
  }, [])

  const classes = useStyles()

  const triggerReceived = e => {
    if(!received) {
      axios.put(`https://rent-me-app.herokuapp.com/api/service/${id}`, { received: true })
        .then(res => {
          return res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const handleDropdown = e => {
    setStatus(e.target.value)
  }

  const handleChanges = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    let status = requestStatus
    let updatedValues = {...values, status}
    axios.put(`https://rent-me-app.herokuapp.com/api/service/${id}`, updatedValues)
      .then(res => {
        return res
      })
      .catch(err => console.log(err))

  }
  return (
    <>
    <form className={classes.formContainer} onSubmit={e => handleSubmit(e)}>
      <TextField
        variant="outlined"
        label="Name"
        defaultValue={request_name}
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
      <Typography style={generateGridValues(1, 3, 2, 2)}>Date Reported: {date_created}</Typography>
      <TextField
        id="date"
        label="Appointment Date"
        type="date"
        value={values.appointment}
        name="appointment"
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
      <Button style={generateGridValues(2, 6, 6, 6)} type="submit">Submit</Button>
    </form>
    </>
  )
}

 export default ServiceRequestForm
