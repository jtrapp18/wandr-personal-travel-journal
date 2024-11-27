import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate} from "react-router-dom";
import TripItinerary from "./TripItinerary";
import TripReview from "./TripReview";

const Home = ({trips}) => {
    // const trips = useOutletContext();
    const navigate = useNavigate();

    // <Navigate to="/login" />

    function goToPg2() {
        // example of how to programmatically navigate to a specific page
        navigate("/page-2");
    }

    return (
        <main>
            This is the home page!

            {/* below are examples of how to use programmatic navigation or conditional programmatic rendering */}
            <button onClick={goToPg2}>This button takes you to page 2!</button>
            {/* {true ? <Navigate to="/" /> : <Navigate to="/page-1" />} */}
            {/* <Outlet context={trips} /> */}
            <ul>
                {trips.map(trip => 
                <li key={trip.id}>
                    <p>{trip.location}</p>
                    <Link to={`/review/${trip.id}`}>Go to Review Page</Link>
                    <Link to={`/itinerary/${trip.id}`}>See Itinerary</Link>
                    {/* <Routes>
                        <Route path={`/review/${trip.id}`} element={<TripReview />} />
                        <Route path={`/itinerary/${trip.id}`} element={<TripItinerary />} />
                    </Routes> */}
                </li>)}
            </ul>

        </main>
    );
}

export default Home;
