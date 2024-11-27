import { Link, Outlet, useOutletContext } from "react-router-dom";
// import TripItinerary from "./TripItinerary";
// import TripReview from "./TripReview";

const Home = () => {
    const trips = useOutletContext();

    return (
        <main>
            This is the home page!
            <Outlet context={trips} />
            <ul>
                {trips.map(trip => 
                <li key={trip.id}>
                    <p>{trip.location}</p>
                    <Link to={`/review/${trip.id}`}>Go to Review Page</Link>
                    <Link to={`/itinerary/${trip.id}`}>See Itinerary</Link>
                </li>)}
            </ul>
        </main>
    );
}

export default Home;
