import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";
import TripItinerary from "./TripItinerary";
import TripReview from "./TripReview";
import SearchBar from "../components/SearchBar"
import SideBar from "../components/SideBar";
import TripCard from "../components/TripCard";
import UpcomingTrips from "../components/UpcomingTrips";

const Home = ({trips}) => {
    const now = new Date();

    // const trips = useOutletContext();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [filterInput, setFilterInput] = useState({
        complete: true,
        incomplete: true,
        startDate: "",
        endDate: "",
    });

    // <Navigate to="/login" />

    const upcomingTrips = trips.filter(trip => {
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(now.getDate() + 5);
      
        const tripStartDate = new Date(trip.startDate);
        console.log(fiveDaysFromNow)
        console.log(tripStartDate)

        return tripStartDate >= now && tripStartDate <= fiveDaysFromNow;
      });

      console.log("Upcoming", upcomingTrips)

    const showTrips = trips.filter(trip=>{
        const searchFilter = searchInput==="" ? true : trip.location.toLowerCase().includes(searchInput.toLowerCase());
        const completeFilter = filterInput.complete ? true : !trip.complete;
        const incompleteFilter = filterInput.incomplete ? true : trip.complete;
        const startDateFilter = filterInput.startDate ? filterInput.startDate < trip.endDate : true;
        const endDateFilter = filterInput.endDate ? filterInput.endDate > trip.startDate : true;

        return searchFilter && completeFilter && incompleteFilter && startDateFilter && endDateFilter;   
    })

    return (
        <>
            {upcomingTrips.length > 0 && (<UpcomingTrips trips={upcomingTrips}/>)}
            <main id="trips-container">
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
                    <div className="card-container">
                        {showTrips.map(trip=>
                            <TripCard
                                key={trip.id}
                            {...trip} 
                            />)}
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;
