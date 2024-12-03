import {useState, useEffect} from "react";
import Headroom from "react-headroom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewTrip from "./pages/NewTrip"
import Page2 from "./pages/Page2"
import TripItinerary from "./pages/TripItinerary";
import TripReview from "./pages/TripReview";
import styled from "styled-components";
import { getJSONByKey } from "./helper";

const Loading = styled.p`
  font-size: 75px;
  font-weight: bold;
`

function App(){
    const [trips, setTrips] = useState([]);

    useEffect(()=>{
        getJSONByKey("trips")
        .then(setTrips)},
    [])

    if (trips.length===0) return <Loading>Loading...</Loading>

    const addTrip = (trip) => {
      setTrips((prevTrips) => [
        ...prevTrips, trip
      ]
      );
    }

    const handleSaveReview = (id, review) => {
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.id === parseInt(id) ? { ...trip, review } : trip
          )
        );
      };

      const handleSaveItinerary = (id, itinerary) => {
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.id === parseInt(id) ? { ...trip, itinerary } : trip
          )
        );
      };

    return(
        <>
            <Headroom>
                <Header />
            </Headroom>
            {/* <Container> */}
                <Routes>
                    <Route path="/" element={<Home trips={trips} />} />
                    <Route path="/new-trip" element={<NewTrip onAddTrip={addTrip}/>} />
                    <Route path="/page-2" element={<Page2/>} />
                    <Route
                        path="/itinerary/:id"
                        element={<TripItinerary trips={trips} onSaveItinerary={handleSaveItinerary} />}
                    />                  
                    <Route
                        path="/review/:id"
                        element={<TripReview trips={trips} onSaveReview={handleSaveReview} />}
                    />                
                 </Routes>
            {/* </Container> */}
            <Footer />
        </>
    );
};

export default App;