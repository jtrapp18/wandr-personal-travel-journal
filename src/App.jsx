import {useState} from "react";
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

function App(){
    const [trips, setTrips] = useState(    // this will be from db.json -- adding here for initial example
        [
            {
                "id": 1,
                "image": "",
                "start-date": "",
                "end-date": "",
                "rating": 0,
                "review": "",
                "location": "Paris",
                "complete": false
            },
            {
                "id": 2,
                "image": "",
                "start-date": "",
                "end-date": "",
                "rating": 0,
                "review": "",
                "location": "New York City",
                "complete": false
            }
        ]);

    return(
        <>
            <Headroom>
                <Header />
            </Headroom>
            <Container>
                <Routes>
                    <Route path="/" element={<Home trips={trips} />} />
                    <Route path="/new-trip" element={<NewTrip/>} />
                    <Route path="/page-2" element={<Page2/>} />
                    <Route path="/itinerary/:id" element={<TripItinerary trips={trips} />} />
                    <Route path="/review/:id" element={<TripReview trips={trips} />} />
                </Routes>
            </Container>
            <Footer />
        </>
    );
};

export default App;