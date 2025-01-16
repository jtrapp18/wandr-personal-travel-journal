import React, { useContext } from 'react';
import NavBar from "./NavBar";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/users";
import { useWindowWidth } from "../context/windowSize";
import MobileNavBar from "./MobileNavBar"

const ExtendedHeader = styled.div`
  display: flex;
  position: relative;
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

  i {
    position: absolute;
    color: gray;
    right: 20px;
    bottom: 0;
    text-align: end;
    font-size: 12px;
  }
`;

const Header = ({ onLoginClick, onLogoutClick }) => {
  const isMobile = useWindowWidth();
  const { user } = useContext(UserContext);

  return (
    <header>
      <ExtendedHeader>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/images/logos/logo_header.png`} alt="logo" />
          {user && (
            <i>{`Logged in as ${user.email}`}</i>
          )}
        </Link>
      </ExtendedHeader>

      {isMobile ? 
        <MobileNavBar onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
        : <NavBar onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
      }
    </header>
  );
}

export default Header;