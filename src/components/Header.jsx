import React from 'react';
import NavBar from "./NavBar"

const Header = () => {

    return (
        <header>
            <div id="ext-header">
                <img src="/images/logo_header.png" alt="logo" />
            </div>
            <NavBar />
        </header>
    );
}

export default Header;
