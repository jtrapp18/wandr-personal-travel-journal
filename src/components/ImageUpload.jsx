import React, { useState } from 'react';
import axios from 'axios';
import { patchJSONToDb } from '../helper';
import styled from 'styled-components';

const UploadContainer = styled.div`
    padding: 20px 0px 20px 0px;

    form {
        display: grid;
    }

    button {
        width: 100px;
        margin-top: 10px;
    }
`

function ImageUpload({trip, handleAddPhoto}) {
    const [file, setFile] = useState();
    const [uploadedFileURL, setUploadedFileURL] = useState(null);
    const [updatedTrip, setUpdatedTrip] = useState(trip);
  
    function handleChange(event) {
        const file = event.target.files[0];

        setFile(event.target.files[0]);

        setUpdatedTrip(prevTrip => ({
            ...prevTrip,
            photos: [...prevTrip.photos, file.name]
        }))
    }
  
    function handleSubmit(event) {
      event.preventDefault()
      const url = 'http://localhost:3001/uploadFile';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(url, formData, config).then((response) => {
        setUploadedFileURL(response.data.fileUrl);
      });

      patchJSONToDb("trips", trip.id, updatedTrip);
      handleAddPhoto(trip.id, file.name);
    }
  
    return (
      <UploadContainer>
          <form onSubmit={handleSubmit}>
            <h2>Upload photos from your trip</h2>
            <input type="file" onChange={handleChange}/>
            <button type="submit">Upload</button>
          </form>
      </UploadContainer>
    );
  }

export default ImageUpload;