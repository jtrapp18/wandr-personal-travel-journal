import React, { useState, useEffect } from 'react';
import Headroom from 'react-headroom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { getJSONByKey } from './helper';
import Login from './components/Login'; 

const Loading = styled.p`
  font-size: 75px;
  font-weight: bold;
`;

function App() {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null); 
  const [showLogin, setShowLogin] = useState(true); 

  useEffect(() => {
    getJSONByKey('trips').then(setTrips);
  }, []);

  if (trips.length === 0) return <Loading>Loading...</Loading>;

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false); 
  };

  const handleLogout = () => {
    setUser(null); 
    setShowLogin(true); 
  };

  return (
    <>
      <Headroom>
        <Header onLoginClick={() => setShowLogin(true)} onLogoutClick={handleLogout} user={user} />
      </Headroom>
      {showLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Outlet
          context={{
            trips,
            addTrip: (trip) => setTrips((prevTrips) => [...prevTrips, trip]),
            handleSaveItinerary: (id, itinerary) => setTrips((prevTrips) =>
              prevTrips.map((trip) =>
                trip.id === parseInt(id) ? { ...trip, itinerary } : trip
              )
            ),
            handleSaveReview: (id, review) => setTrips((prevTrips) =>
              prevTrips.map((trip) =>
                trip.id == parseInt(id) ? { ...trip, ...review } : trip
              )
            ),
            handleAddPhoto: (id, photo) => setTrips((prevTrips) =>
              prevTrips.map((trip) =>
                trip.id === parseInt(id) ? { ...trip, photos: [...trip.photos, photo] } : trip
              )
            ),
          }}
        />
      )}
      <Footer />
    </>
  );
}

export default App;