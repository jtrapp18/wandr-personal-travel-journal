import React from 'react';
import NavBar from "./NavBar"
import { Navigate, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    
    function goToNewTripPage() {
        // example of how to programmatically navigate to a specific page
        navigate("/new-trip");
    }

    return (
        <header>
            <div id="ext-header">
                <h2>This is a Header!</h2>
                <button onClick={goToNewTripPage}>Add Trip</button>
            </div>
            <NavBar />
        </header>
    );
}

export default Header;
