import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";
import TripItinerary from "./TripItinerary";
import TripReview from "./TripReview";
import SearchBar from "../components/SearchBar"
import SideBar from "../components/SideBar";
import { Card } from "semantic-ui-react";
import TripCard from "../components/TripCard";

const Home = ({trips}) => {
    // const trips = useOutletContext();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [filterInput, setFilterInput] = useState({
        complete: true,
        incomplete: true,
    });

    // <Navigate to="/login" />



    const showTrips = trips.filter(trip=>{
        const searchFilter = searchInput==="" ? true : trip.location.toLowerCase().includes(searchInput.toLowerCase());
        const completeFilter = filterInput.complete ? true : !trip.complete;
        const incompleteFilter = filterInput.incomplete ? true : trip.complete;

        return searchFilter && completeFilter && incompleteFilter;   
    })

    return (
        <main id="trips-container">
            {/* <div id="trips-container"> */}
                <SideBar
                    filterInput={filterInput}
                    setFilterInput={setFilterInput}
                />
                <section id="trips-main">
                    <SearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                    />
                    <div>
                        <h1>My Trips</h1>
                    </div>
                    <div id="card-container">
                        
                        {showTrips.map(trip=>
                            <TripCard
                                key={trip.id}
                            {...trip} 
                            />)}
                    </div>
                </section>
            {/* </div> */}
        </main>
    );
}

export default Home;
