import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmbeddedJSONById, patchJSONToDb, postJSONToDb } from "../helper.js";

const TripItinerary = ({ trips }) => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState("");
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [trip, setTrip] = useState(null); 

  useEffect(() => {
    const fetchTripWithActivities = async () => {
      try {
        const data = await getEmbeddedJSONById("trips", id, "activities");
        setTrip(data);
        setItinerary(data.itinerary || "");
        setActivities(data.activities || []);
      } catch (error) {
        console.error("Error fetching trip with activities:", error);
      }
    };

    fetchTripWithActivities();
  }, [id]);

  const handleSaveItinerary = async () => {
    try {
      await patchJSONToDb("trips", id, { itinerary });
      console.log("Itinerary saved successfully!");
    } catch (error) {
      console.error("Error saving itinerary:", error);
    }
  };

  const handleAddActivity = async () => {
    try {
      const newActivityObj = { tripId: parseInt(id), activity: newActivity };
      const activity = await postJSONToDb("activities", newActivityObj);
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
        placeholder="Add your itinerary details"
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