import React from 'react';
import NavBar from "./NavBar"
import styled from 'styled-components';

const ExtendedHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 175px;
  color: white;
  width: 100%;
  background-color: white;

  img {
    height: 100%;
  }
`

const Header = () => {

    return (
        <header>
            <ExtendedHeader>
                <img src="/images/logos/logo_header.png" alt="logo" />
            </ExtendedHeader>
            <NavBar />
        </header>
    );
}

export default Header;
