
import {useState} from "react";
import SearchBar from "../components/SearchBar"
import SideBar from "../components/SideBar";
import TripCard from "../components/TripCard";
import UpcomingTrips from "../components/UpcomingTrips";
import styled from "styled-components";
import {useOutletContext} from "react-router-dom";
import {isPastDate} from "../helper"

const ShowHide = styled.div`
    cursor: pointer;
    display: flex;
    background-color: var(--dark-green);
    justify-content: end;
    padding-right: 20px;

    span:hover {
      font-weight: bold;
    }
`;

const TripsContainer = styled.main`
  display: flex;
`

const TripsMain = styled.section`
  flex: 1;

  > div {
    padding: 20px;
  }
`

const TripCardContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`

const Home = () => {
    const {trips} = useOutletContext();

    const [searchInput, setSearchInput] = useState("");
    const [filterInput, setFilterInput] = useState({
        complete: true,
        incomplete: true,
        startDate: "",
        endDate: "",
        rating: 0,
    });

    const upcomingTrips = trips.filter(trip => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
    
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(now.getDate() + 5);

        const tripStartDate = new Date(trip.startDate);
        tripStartDate.setHours(0, 0, 0, 0);

        const tripEndDate = new Date(trip.endDate);
        tripEndDate.setHours(0, 0, 0, 0);
    
        return (tripStartDate <= fiveDaysFromNow && tripEndDate >= now);
    });

    const [showUpcoming, setShowUpcoming] = useState(upcomingTrips.length > 0);

    const showTrips = trips.filter(trip=>{

        const searchFilter = searchInput==="" ? true : trip.tripLocation.toLowerCase().includes(searchInput.toLowerCase());
        const completeFilter = filterInput.complete ? true : !isPastDate(trip.endDate);
        const incompleteFilter = filterInput.incomplete ? true : isPastDate(trip.endDate);
        const startDateFilter = filterInput.startDate ? filterInput.startDate < trip.endDate : true;
        const endDateFilter = filterInput.endDate ? filterInput.endDate > trip.startDate : true;
        const ratingFilter = filterInput.rating ? filterInput.rating <= trip.rating : true;

        return searchFilter && completeFilter && incompleteFilter && startDateFilter && endDateFilter && ratingFilter;   
    })

    return (
        <>
            <div>
                <ShowHide onClick={()=>setShowUpcoming(showUpcoming=>!showUpcoming)}>
                    <span>
                        {`${showUpcoming ? "Hide" : "Show"}
                        Upcoming Trips`}
                    </span>                    
                    <span>
                        {showUpcoming ? "▲" : "▼"}
                    </span>
                </ShowHide>
                {showUpcoming && (
                    <UpcomingTrips 
                        trips={upcomingTrips}
                    />
                )}
            </div>
            
            <TripsContainer>
                <SideBar
                    filterInput={filterInput}
                    setFilterInput={setFilterInput}
                />
                <TripsMain>
                    <SearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                    />
                    <div>
                        <h1>My Trips</h1>
                    </div>
                    <TripCardContainer>
                        {showTrips.map(trip=>
                            <TripCard
                                key={trip.id}
                                {...trip} 
                            />)}
                    </TripCardContainer>
                </TripsMain>
            </TripsContainer>
        </>
    );
}

export default Home;
