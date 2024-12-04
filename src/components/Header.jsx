import React from 'react';
import NavBar from "./NavBar";
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

const ExtendedHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 175px;
  color: white;
  width: 100%;
  background-color: white;

  img {
    height: auto; 
    max-height: 150px; 
    width: auto; 
    max-width: 100%; 
    cursor: pointer; 
  }
`;

const Header = ({ user, onLoginClick, onLogoutClick }) => {
  return (
    <header>
      <ExtendedHeader>
        <Link to="/">
          <img src="/images/logos/logo_header.png" alt="logo" />
        </Link>
      </ExtendedHeader>
      <NavBar user={user} onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
    </header>
  );
}

export default Header;