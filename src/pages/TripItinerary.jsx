import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getActivitiesByTripId, patchJSONToDb, postJSONToDb } from "../helper.js";
import { StyledForm, IndivTripMain, StyledButton, TempMessage, AddPersonBtn } from "../MiscStyling";
import styled from "styled-components";
import { formatDate } from "../helper.js";
import Attendees from "../components/Attendees.jsx";

const DescriptionLabel = styled.label`
  padding-bottom: 100px;
`

const TripItinerary = () => {
  const {handleSaveTripEdits} = useOutletContext();

  const { id } = useParams();
  const {trips} = useOutletContext();
  const data = trips.find((trip) => trip.id === parseInt(id));

  const [tempMsg, setTempMsg] = useState("");
  const [tripDescription, setDescription] = useState("");
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [newActivityDate, setNewActivityDate] = useState(""); // New state for activity date
  const [trip, setTrip] = useState(null); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendees, setAttendees] = useState("");
  const [attendee, setAttendee] = useState("");

  useEffect(() => {
    
    setTrip(data);
    setDescription(data.tripDescription || "");
    setAttendees(data.attendees || "");        
    setActivities(data.activities || []);
    setStartDate(data.startDate || "");
    setEndDate(data.endDate || "");

    const fetchTripWithActivities = async () => {
      try {
        const activities = await getActivitiesByTripId(id);
     
        setActivities(activities || []);

      } catch (error) {
        console.error("Error fetching trip with activities:", error);
      }
    };

    fetchTripWithActivities();
  }, [data, id]);

  const handleSaveItinerary = async () => {
    try {
      await patchJSONToDb("trips", id, { startDate, endDate, tripDescription });
      console.log("Itinerary saved successfully!");

      // await postJSONToDb("attendees", { attendees });
      // console.log("Itinerary saved successfully!");

      handleSaveTripEdits(id, { startDate, endDate, tripDescription, attendees });
      showMessage(trip.tripLocation);
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
        activityDate: newActivityDate, // Include date in new activity
      };
      const activity = await postJSONToDb("activities", newActivityObj);
      setActivities((prev) => [...prev, activity]);
      setNewActivity("");
      setNewActivityDate(""); // Reset date input
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  const showMessage = (tripLocation) => {
    setTempMsg(`Changes to ${tripLocation} trip successfully saved`);

    // Hide the message after 2 seconds
    setTimeout(() => {
        setTempMsg('');
    }, 2000);
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <IndivTripMain>
      <h1 className="itinerary-title">Plan your itinerary for {trip.tripLocation}</h1>
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
            value={tripDescription}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add your itinerary details"
          />
        </DescriptionLabel>
        <br />
        <StyledButton type="button" onClick={handleSaveItinerary}>Save Itinerary</StyledButton>
      </StyledForm>
      {tempMsg && <TempMessage>{tempMsg}</TempMessage>}
      <hr />
      <StyledForm>               
      <h2 className="activities-title">Activities</h2>
        <ul className="activities-list">
          {activities.map((act) => (
            <li key={act.id} className="activity-item">
              {act.activity} - {act.activityDate ? formatDate(act.activityDate) : 'No date set'}
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
        <StyledButton type="button" onClick={handleAddActivity}>Add Activity</StyledButton>
      </StyledForm>
    </IndivTripMain>
  );
};

export default TripItinerary;