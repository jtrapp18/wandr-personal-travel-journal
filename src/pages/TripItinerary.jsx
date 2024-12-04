import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmbeddedJSONById, patchJSONToDb, postJSONToDb } from "../helper.js";
import { StyledForm, IndivTripMain, StyledButton } from "../MiscStyling";
import styled from "styled-components";
import { formatDate } from "../helper.js";
import Attendees from "../components/Attendees.jsx";

const DescriptionLabel = styled.label`
  padding-bottom: 100px;
`

const AddPersonBtn = styled.button`
    position: absolute;
    right: 0;
    width: 30px;
    top: 0;
    margin: 0;
    border: 2px solid black;
    background-color: var(--dark-green);
`;

// const .activities-list, .activity-item, .activity-input {
//   margin: 10px 0;
// }

const TripItinerary = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [newActivityDate, setNewActivityDate] = useState(""); // New state for activity date
  const [trip, setTrip] = useState(null); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendees, setAttendees] = useState("");
  const [attendee, setAttendee] = useState("");

  useEffect(() => {
    const fetchTripWithActivities = async () => {
      try {
        const data = await getEmbeddedJSONById("trips", id, "activities");
        setTrip(data);
        setDescription(data.description || "");
        setAttendees(data.attendees || "");        
        setActivities(data.activities || []);
        setStartDate(data.startDate || "");
        setEndDate(data.endDate || "");
      } catch (error) {
        console.error("Error fetching trip with activities:", error);
      }
    };

    fetchTripWithActivities();
  }, [id]);

  const handleSaveItinerary = async () => {
    try {
      await patchJSONToDb("trips", id, { description, attendees });
      console.log("Itinerary saved successfully!");
    } catch (error) {
      console.error("Error saving itinerary:", error);
    }
  };

  const handleAddAttendee = async () => {
    setAttendees(attendees=>[...attendees, attendee]);
  };

  const handleAddActivity = async () => {
    try {
      const newActivityObj = {
        tripId: parseInt(id),
        activity: newActivity,
        date: newActivityDate, // Include date in new activity
      };
      const activity = await postJSONToDb("activities", newActivityObj);
      setActivities((prev) => [...prev, activity]);
      setNewActivity("");
      setNewActivityDate(""); // Reset date input
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <IndivTripMain>
      <h1 className="itinerary-title">Plan your itinerary for {trip.location}</h1>
      <StyledForm>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Attendees:
          <input
            type="text"
            value={attendee}
            onChange={(e) => setAttendee(e.target.value)}
            placeholder="Add attendee"
          />
          <AddPersonBtn type="button" onClick={handleAddAttendee}>+</AddPersonBtn>
        </label>
        <br />
        <Attendees attendees={attendees}/>
        <br />
        <DescriptionLabel>
          Description:
          <textarea
            className="itinerary-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add your itinerary details"
          />
        </DescriptionLabel>
        <br />
        <StyledButton className="save-button" onClick={handleSaveItinerary}>Save Itinerary</StyledButton>
      </StyledForm>  
      <hr />
      <StyledForm>               
      <h2 className="activities-title">Activities</h2>
        <ul className="activities-list">
          {activities.map((act) => (
            <li key={act.id} className="activity-item">
              {act.activity} - {act.date ? formatDate(act.date) : 'No date set'}
            </li>
          ))}
        </ul>
        <br />
        <label>
          Activity:
          <input
            type="text"
            className="activity-input"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            placeholder="Add new activity"
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            className="activity-date-input"
            value={newActivityDate}
            onChange={(e) => setNewActivityDate(e.target.value)}
            placeholder="Select date"
          />
        </label>
        <br />
        <StyledButton onClick={handleAddActivity}>Add Activity</StyledButton>
      </StyledForm>
    </IndivTripMain>
  );
};

export default TripItinerary;