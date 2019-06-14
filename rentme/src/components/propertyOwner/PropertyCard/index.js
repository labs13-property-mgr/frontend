import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";

class PropertyCard extends Component {
  state = {
    selectedFile : null
  }

  handleImageChange = (e) => {
    this.setState({
      selectedFile : e.target.files[0]
    })
  }

  handleUploadPicture = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('https://us-central1-rentme-52af4.cloudfunctions.net/uploadFile', fd, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
      }
    })
  }


  render() {
    return (
      <>
        <h1>Property Card</h1>

        <div>

          {this.selectedFile === null ? (
            <img src="./" />
          ) : (
            <img src={this.selectedFile} />
          )}
          
          <input type="file" onChange={this.handleImageChange}/>

          <Tooltip title="Add Property Photo" placement="top">
            <button onClick={this.handleUploadPicture}>Upload</button>
          </Tooltip>

        </div>

        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          href="/add-tenant"
        >
          Add a Tenant
        </Button>
      </>
    );
  }
};

export default PropertyCard;
