import {useState} from "react";
import Headroom from "react-headroom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "semantic-ui-react";

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
                <Outlet context={trips} />
            </Container>
            <Footer />
        </>
    );
};

export default App;