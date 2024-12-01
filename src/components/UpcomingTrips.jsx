import TripCard from "./TripCard";
import WeatherForecast from "./WeatherForecast";

const UpcomingTrips = ({trips}) => {
    return (
        <div id="upcoming-trips">
            <div>
                <h1>Trips coming up in the next 5 days</h1>
            </div>
            <div>
                {trips.map(trip => (
                <>
                    <TripCard 
                        key={trip.id} 
                        {...trip} 
                    />
                    <WeatherForecast
                        key={trip.id}
                        location={trip.location}
                        startDate={trip.startDate}
                    />
                </>
                ))}
            </div>
        </div>
)}

export default UpcomingTrips;
