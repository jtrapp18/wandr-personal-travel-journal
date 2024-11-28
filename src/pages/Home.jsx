import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate} from "react-router-dom";
import TripItinerary from "./TripItinerary";
import TripReview from "./TripReview";
import { Card } from "semantic-ui-react";
import TripCard from "../components/TripCard";

const Home = ({trips}) => {
    // const trips = useOutletContext();
    const navigate = useNavigate();

    // <Navigate to="/login" />

    function goToNewTripPage() {
        // example of how to programmatically navigate to a specific page
        navigate("/new-trip");
    }

    return (
        <main>
            This is the home page!
            <button onClick={goToNewTripPage}>Add Trip</button>

            <Card.Group>
                {trips.map(trip=>
                    <TripCard
                        key={trip.id}
                       {...trip} 
                    />)}
            </Card.Group>
        </main>
    );
}

export default Home;
