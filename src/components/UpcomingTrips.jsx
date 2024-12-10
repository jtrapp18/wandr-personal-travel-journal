import TripCard from "./TripCard";
import WeatherForecast from "./WeatherForecast";
import styled from "styled-components";
import GalleryLoop from "../hooks/galleryLoop";
import { PrevButton, NextButton } from "../MiscStyling";

const UpcomingTripContainer = styled.div`
    position: relative;
    background-color: var(--gray);
    justify-content: center;
    overflow-x: scroll;
    padding: 20px;

    &:hover button {
        opacity: 1;
    }
    `;

const UpcomingTripsMain = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    overflow: visible;
    `;

const TripCount = styled.span`
    text-align: end;
    `;

const UpcomingTrips = ({trips}) => {

    const [tripIndex, , trip, prevImage, nextImage] = GalleryLoop(trips);

    if (trips.length===0) return <h1>No trips coming up in the next 5 days</h1>

    return (
        <UpcomingTripContainer>
            <h1>Trips coming up in the next 5 days</h1>            
            <UpcomingTripsMain>
                <TripCard 
                    {...trip}
                    prevImage={prevImage}
                    nextImage={nextImage}
                />
                <WeatherForecast
                    tripLocation={trip.tripLocation}
                />
            </UpcomingTripsMain>
            <PrevButton onClick={prevImage}>
                &#8249;
            </PrevButton>
            <NextButton onClick={nextImage}>
                &#8250;
            </NextButton>
            <TripCount>{`${tripIndex+1} of ${trips.length}`}</TripCount>
        </UpcomingTripContainer>
)}

export default UpcomingTrips;
