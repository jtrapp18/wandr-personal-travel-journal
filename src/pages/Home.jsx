
import {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar"
import SideBar from "../components/SideBar";
import TripCard from "../components/TripCard";
import UpcomingTrips from "../components/UpcomingTrips";

const Home = ({trips}) => {
    const now = new Date();

    const [showUpcoming, setShowUpcoming] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filterInput, setFilterInput] = useState({
        complete: true,
        incomplete: true,
        startDate: "",
        endDate: "",
        rating: 0,
    });

    const upcomingTrips = trips.filter(trip => {
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(now.getDate() + 5);
      
        const tripStartDate = new Date(trip.startDate);
        console.log(fiveDaysFromNow)
        console.log(tripStartDate)

        return tripStartDate >= now && tripStartDate <= fiveDaysFromNow;
      });

    useEffect(()=> {
        if (upcomingTrips.length > 0) {
            setShowUpcoming(true);
        };
    }, [])
    
    const showTrips = trips.filter(trip=>{
        const searchFilter = searchInput==="" ? true : trip.location.toLowerCase().includes(searchInput.toLowerCase());
        const completeFilter = filterInput.complete ? true : !trip.complete;
        const incompleteFilter = filterInput.incomplete ? true : trip.complete;
        const startDateFilter = filterInput.startDate ? filterInput.startDate < trip.endDate : true;
        const endDateFilter = filterInput.endDate ? filterInput.endDate > trip.startDate : true;
        const ratingFilter = filterInput.rating ? filterInput.rating <= trip.rating : true;

        return searchFilter && completeFilter && incompleteFilter && startDateFilter && endDateFilter && ratingFilter;   
    })

    return (
        <>
            <div>
                <div className="show-hide" onClick={()=>setShowUpcoming(showUpcoming=>!showUpcoming)}>
                    <span>
                        {`${showUpcoming ? "Hide" : "Show"}
                        Upcoming Trips`}
                    </span>                    
                    <span>
                        {showUpcoming ? "▲" : "▼"}
                    </span>
                </div>
                {showUpcoming && (
                    <UpcomingTrips 
                        trips={upcomingTrips}
                    />
                )}
            </div>
            
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
