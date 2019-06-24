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

    let fullFileName =  Date.now() + this.state.selectedFile.name;

    fd.append('image', this.state.selectedFile, fullFileName)

    axios.post('https://us-central1-rentme-52af4.cloudfunctions.net/uploadFile', fd, {

      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
      }
    })
  }


  render() {

    // document.getElementById('propertyImage').src = "https://firebasestorage.googleapis.com/v0/b/rentme-52af4.appspot.com/o/resized-" + fileName + "?alt=media&token=" + imageToken;

    return (
      <>
        <h1>Property Card</h1>

        <div>

          {this.selectedFile === null ? (
            <img src="" id="propertyImage"/>
          ) : (
            <img src={this.selectedFile} />
          )}

          <img src='https://storage.googleapis.com/rentme-52af4.appspot.com/resized-1561063140099Austin.jpg?GoogleAccessId=firebase-adminsdk-jqauv%40rentme-52af4.iam.gserviceaccount.com&Expires=16447017600&Signature=eGVA9Pi2lHRMFmjGmtcLM6tyKKejEbLeTWdM14CnGgZ9xV%2Fqrvq980bnG9YxUW%2BVAqLLFmSH69OZJ9m1d5JdfUxsVaJyWwzbVMUNeuy52ppARRFNAvjJsZNpsaS4b2e8RfngvxMT1USr3lBHe77IETYB7Pv%2BwcgGdSPNi0Xbw9Rwmdj5hAgslCw5cBSm1wcokUPxceyepj4yO%2FjWDXRXepHHSeF1b7sD8WFut7FGu1aMisPRnTuxD0jqj2u8X%2FfmJMtwlBVQYTUVbBg%2FZlmo11c%2Bf6cZxMRJy%2Fg1FTMt01gF5%2BRyfU8zJxC9My4B5I7sThj4sBJL4%2FpB3kWuSR8T6A%3D%3D' />
          
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
