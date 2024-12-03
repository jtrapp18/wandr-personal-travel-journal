
import {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar"
import SideBar from "../components/SideBar";
import TripCard from "../components/TripCard";
import UpcomingTrips from "../components/UpcomingTrips";
import styled from "styled-components";

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
