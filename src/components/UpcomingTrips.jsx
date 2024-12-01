import TripCard from "./TripCard";
import WeatherForecast from "./WeatherForecast";
import {useState, useEffect} from "react";

const UpcomingTrips = ({trips}) => {

    const [tripIndex, setTripIndex] = useState(0);
    const trip = trips[tripIndex] || null;

    const prevImage = () => {setTripIndex(prevIndex => (prevIndex - 1 + trips.length) % trips.length)};
    const nextImage = () => {setTripIndex(prevIndex => (prevIndex + 1) % trips.length)};

    if (trips.length===0) return <h1>No trips coming up in the next 5 days</h1>

    return (
        <div id="upcoming-container">
            <h1>Trips coming up in the next 5 days</h1>            
            <div id="upcoming-main">
                <TripCard 
                    {...trip}
                    prevImage={prevImage}
                    nextImage={nextImage}
                />
                <WeatherForecast
                    location={trip.location}
                />
            </div>
            <button className="prev-btn" onClick={prevImage}>
                &#8249;
            </button>
            <button className="next-btn" onClick={nextImage}>
                &#8250;
            </button>
            <span id="trip-count">{`${tripIndex+1} of ${trips.length}`}</span>
        </div>
)}

export default UpcomingTrips;
