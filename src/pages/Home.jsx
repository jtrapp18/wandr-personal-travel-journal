import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import { Navigate, useNavigate} from "react-router-dom";
import TripItinerary from "./TripItinerary";
import TripReview from "./TripReview";

const Home = ({trips}) => {
    // const trips = useOutletContext();
    // const navigate = useNavigate();

    // <Navigate to="/login" />

    return (
        <main>
            This is the home page!
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
