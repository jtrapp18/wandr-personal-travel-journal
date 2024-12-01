import {useState, useEffect} from "react";
import Headroom from "react-headroom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "semantic-ui-react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewTrip from "./pages/NewTrip"
import Page2 from "./pages/Page2"
import TripItinerary from "./pages/TripItinerary";
import TripReview from "./pages/TripReview";

import { getJSONByKey } from "./helper";

function App(){
    const [trips, setTrips] = useState([]);

    useEffect(()=>{
        getJSONByKey("trips")
        .then(setTrips)},
    [])

    if (trips.length===0) return <p className="loading">Loading...</p>

    return(
        <>
            <Headroom>
                <Header />
            </Headroom>
            {/* <Container> */}
                <Routes>
                    <Route path="/" element={<Home trips={trips} />} />
                    <Route path="/new-trip" element={<NewTrip/>} />
                    <Route path="/page-2" element={<Page2/>} />
                    <Route path="/itinerary/:id" element={<TripItinerary trips={trips} />} />
                    <Route path="/review/:id" element={<TripReview trips={trips} />} />
                </Routes>
            {/* </Container> */}
            <Footer />
        </>
    );
};

export default App;