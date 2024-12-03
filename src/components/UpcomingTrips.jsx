import TripCard from "./TripCard";
import WeatherForecast from "./WeatherForecast";
import {useState} from "react";
import styled from "styled-components";

const UpcomingTripContainer = styled.div`
    position: relative;
        background-color: var(--gray);
        justify-content: center;
        overflow-x: scroll;
        padding: 20px;

    .prev-btn, .next-btn {
        opacity: 0;
        position: absolute;
        top: 40%;
        background: transparent;
        color: white;
        font-size: 50px;
        font-weight: bold;
        background-color: rgba(0,0,0,.5);
        border: none;
        cursor: pointer;
    }

    .prev-btn {
        left: 10px;
    }

    .next-btn {
        right: 10px;
    }

    &:hover .prev-btn, :hover .next-btn {
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

    const [tripIndex, setTripIndex] = useState(0);
    const trip = trips[tripIndex] || null;

    const prevImage = () => {setTripIndex(prevIndex => (prevIndex - 1 + trips.length) % trips.length)};
    const nextImage = () => {setTripIndex(prevIndex => (prevIndex + 1) % trips.length)};

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
                    location={trip.location}
                />
            </UpcomingTripsMain>
            <button className="prev-btn" onClick={prevImage}>
                &#8249;
            </button>
            <button className="next-btn" onClick={nextImage}>
                &#8250;
            </button>
            <TripCount>{`${tripIndex+1} of ${trips.length}`}</TripCount>
        </UpcomingTripContainer>
)}

export default UpcomingTrips;
