import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TripItinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState("");
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [trip, setTrip] = useState(null); 

  
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`http://localhost:3000/trips/${id}`);
        const data = await response.json();
        setTrip(data); 
        setItinerary(data.itinerary || ""); 
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/activities?tripId=${id}`
        );
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchTrip();
    fetchActivities();
  }, [id]);

  
  const handleSaveItinerary = async () => {
    try {
      await fetch(`http://localhost:3000/trips/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itinerary }),
      });
      console.log("Itinerary saved successfully!");
    } catch (error) {
      console.error("Error saving itinerary:", error);
    }
  };


  const handleAddActivity = async () => {
    try {
      const response = await fetch(`http://localhost:3000/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: id, activity: newActivity }),
      });
      const activity = await response.json();
      setActivities((prev) => [...prev, activity]);
      setNewActivity("");
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };


  if (!trip) return <div>Loading...</div>;

  return (
    <main>
      <h1>Plan your itinerary for {trip.location}</h1>
      <textarea
        value={itinerary}
        onChange={(e) => setItinerary(e.target.value)}
        placeholder="Add your itinerary details..."
      />
      <button onClick={handleSaveItinerary}>Save Itinerary</button>

      <h2>Activities</h2>
      <ul>
        {activities.map((act) => (
          <li key={act.id}>{act.activity}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        placeholder="Add new activity"
      />
      <button onClick={handleAddActivity}>Add Activity</button>
    </main>
  );
};

export default TripItinerary;