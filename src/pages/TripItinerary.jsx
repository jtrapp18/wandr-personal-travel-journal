import { useParams, useOutletContext } from "react-router-dom";
import { getEmbeddedJSONById } from "../helper";

const TripItinerary = ({trips}) => {
    // const trips = useOutletContext();
    const params = useParams();
  
    const trip = trips.find(trip => trip.id === parseInt(params.id));

    return (
        <main>
            {`This is the itinerary page for ${trip.location}!`}
        </main>
    );
}

export default TripItinerary;
