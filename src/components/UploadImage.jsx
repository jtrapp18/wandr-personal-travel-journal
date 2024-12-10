import { useEffect, useRef } from "react";
import { postJSONToDb } from "../helper";
import styled from "styled-components";
import { StyledButton } from "../MiscStyling";

const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0px 20px 0px;
    width: 90%;
    max-width: 700px;
    min-width: 500px;
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

                const newPhoto = {
                    tripId: trip.id,
                    photoUrl: url
                }

                postJSONToDb("photos", newPhoto);
                handleAddPhoto(trip.id, url);}

            else if (error) {
                console.error("Upload failed:", error)
            }
        })
    }, [trip, handleAddPhoto])

    return (
        <UploadContainer>
            <h2>Upload photos from trip</h2>
            <StyledButton onClick={() => widgetRef.current.open()}>
                Select Photo(s)
            </StyledButton>
        </UploadContainer>
    )
}

export default UploadImage;