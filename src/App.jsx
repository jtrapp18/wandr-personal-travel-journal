import Headroom from "react-headroom"
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "semantic-ui-react";

function App(){

    return(
        <>
            <Headroom>
                <Header />
            </Headroom>
            <Container>
                <Outlet/>
            </Container>
            <Footer />
        </>
    );
};

export default App;