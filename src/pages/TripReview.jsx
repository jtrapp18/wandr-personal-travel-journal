import { useParams, useOutletContext } from "react-router-dom";

const TripReview = ({trips}) => {
    // const trips = useOutletContext();
    const params = useParams();
  
    const trip = trips.find(trip => trip.id === parseInt(params.id));

    return (
        <main>
            {`This is the review page for ${trip.location}!`}
        </main>
    );
}

export default TripReview;
