import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { snakeToCamel, getJSONByUserId } from './helper';
import Login from './components/Login'; 
import { UserContext } from './context/users';

const Loading = styled.p`
  font-size: 75px;
  font-weight: bold;
`;

function App() {
  const { user, setUser } = useContext(UserContext);
  const [trips, setTrips] = useState([]);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {

    if (!user) {
      return;
    }
    getJSONByUserId(user.id).then((trips) => {
      const tripsTransformed = snakeToCamel(trips).map(trip => ({
        ...trip,
        attendees: trip.attendees ? trip.attendees.split(",") : [],
        photos: trip.photos ? trip.photos.split(",") : [],
        startDate: new Date(trip.startDate).toISOString().split("T")[0],
        endDate: new Date(trip.endDate).toISOString().split("T")[0]
      }));
      setTrips(tripsTransformed);
      console.log(`${user.email} info:`, trips)       
    });

  }, [user]);

  if (!showLogin & !user) return <Loading>Loading...</Loading>;

  const handleLogin = (userData) => {
    setUser(userData);
    console.log(userData)
    setShowLogin(false); 
  };

  const handleLogout = () => {
    setUser(null); 
    setShowLogin(true); 
  };

  return (
    <>
      <Header onLoginClick={() => setShowLogin(true)} onLogoutClick={handleLogout} />
      {showLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Outlet
          context={{
            trips,
            addTrip: (trip) => setTrips((prevTrips) => [...prevTrips, trip]),
            handleSaveTripEdits: (id, itinerary) => setTrips((prevTrips) =>
              prevTrips.map((trip) =>
                trip.id === parseInt(id) ? { ...trip, ...itinerary } : trip
              )
            ),
            handleSaveReview: (id, review) => setTrips((prevTrips) =>
              prevTrips.map((trip) =>
                trip.id === parseInt(id) ? { ...trip, ...review } : trip
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