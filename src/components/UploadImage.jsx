import { useEffect, useRef } from "react";
import { patchJSONToDb } from "../helper";
import styled from "styled-components";

const PhotoContainer = styled.div`
    padding: 20px 20px 20px 0px

`

const UploadImage = ({trip, handleAddPhoto}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'djd2t7uvb',
            uploadPreset: 'photos-from-trip'
        }, function(error, result) {
            if (result && result.event ==="success") {
                console.log(result);

                const url = result.info.secure_url;

                const updatedTrip = {
                    ...trip,
                    photos: [...trip.photos, url]
                }

                patchJSONToDb("trips", trip.id, updatedTrip);
                handleAddPhoto(trip.id, url);}

            else if (error) {
                console.error("Upload failed:", error)
            }
        })
    }, [trip, handleAddPhoto])

    return (
        <PhotoContainer>
            <h2>Upload photos from trip</h2>
            <button onClick={() => widgetRef.current.open()}>
                Select Photo(s)
            </button>
        </PhotoContainer>
    )
}

export default UploadImage;