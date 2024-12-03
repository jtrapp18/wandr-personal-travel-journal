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
    <main className="itinerary-main">
      <h1 className="itinerary-title">Plan your itinerary for {trip.location}</h1>
      <textarea
        className="itinerary-textarea"
        value={itinerary}
        onChange={(e) => setItinerary(e.target.value)}
        placeholder="Add your itinerary details"
      />
      <button className="save-button" onClick={handleSaveItinerary}>Save Itinerary</button>
  
      <h2 className="activities-title">Activities</h2>
      <ul className="activities-list">
        {activities.map((act) => (
          <li key={act.id} className="activity-item">{act.activity}</li>
        ))}
      </ul>
      <input
        type="text"
        className="activity-input"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        placeholder="Add new activity"
      />
      <button className="add-activity-button" onClick={handleAddActivity}>Add Activity</button>
    </main>
  );
};

export default TripItinerary;