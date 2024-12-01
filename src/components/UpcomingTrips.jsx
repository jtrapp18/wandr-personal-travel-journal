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
            <div>
                <h1>Trips coming up in the next 5 days</h1>
            </div>
            <div id="upcoming-main">
                <div className="upcoming-card-container">
                    <TripCard 
                        {...trip}
                        prevImage={prevImage}
                        nextImage={nextImage}
                    />
                    <WeatherForecast
                        location={trip.location}
                    />
                </div>
            </div>
        </div>
)}

export default UpcomingTrips;
