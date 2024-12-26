import React, {useState} from "react";
import Attendees from "../components/Attendees";
import styled from "styled-components";
import { IndivTripMain, StyledForm, StyledButton, TempMessage, AddPersonBtn } from "../MiscStyling";
import { useOutletContext } from "react-router-dom";
import { postJSONToDb, snakeToCamel } from "../helper";

const StyledMark = styled.mark`
    background-color: var(--yellow);
    position: relative;
    left: 0;
    width: 100%;
`

const DescriptionLabel = styled.label`
  padding-bottom: 100px;
`

function NewTrip() {
  const {addTrip, user} = useOutletContext();

  const emptyObj = {
      image: "",
      startDate: "",
      endDate: "",
      tripLocation: "",
      attendees: [],
      tripDescription: "",
    }
    const [formData, setFormData] = useState(emptyObj);
    const [attendee, setAttendee] = useState("");
    const [passVal, setPassVal] = useState(true);
    const [tempMsg, setTempMsg] = useState("");

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.type==="checkbox" ? event.target.checked : event.target.value;

        setFormData(prevData=> {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function changePerson(event) {
        setAttendee(event.target.value);
    }

    function addPerson() {
        setFormData(prevData=> {
            return {
                ...prevData,
                attendees: [...prevData.attendees, attendee]
            };
        })

        setAttendee("");
    }

    function missingItems() {
        return Object.keys(formData).filter(key=>
        formData[key]==="")}

    const showMessage = (tripLocation) => {
        setTempMsg(`Added ${tripLocation} to Bucket List!`);

        // Hide the message after 2 seconds
        setTimeout(() => {
            setTempMsg('');
        }, 2000);
    };

  function handleSubmit(event) {
    event.preventDefault();

    if (missingItems().length > 0) {
      setPassVal(false);
    }

    else  {
      setPassVal(true);
      const newTrip = {
        userId: 1, 
        image: formData.image,
        startDate: formData.startDate,
        endDate: formData.endDate,
        tripLocation: formData.tripLocation,
        tripDescription: formData.tripDescription,
      }

      postJSONToDb("trips", newTrip)
      .then(trip=>{
        console.log("New trip to add:", trip, trip.id)

        const newAttendees = formData.attendees.map(attendee => ({
          tripId: trip.id,
          attendeeName: attendee
        }));

        postJSONToDb("attendees", newAttendees)
        .then(attendees=>{
          console.log("Added:", attendees);
          const tripsTransformed = {
            ...snakeToCamel(trip),
            attendees: formData.attendees,
            photos: [],
          }

          addTrip(tripsTransformed);
          console.log("Added:", tripsTransformed);
          showMessage(tripsTransformed.tripLocation);
        })
        .catch(e=>console.error(e));

        setFormData(emptyObj);

      })
      .catch(e=>console.error(e));
    }

  }

  return (
    <IndivTripMain>
      <h1>Add New Trip to Bucket List</h1>
      <StyledForm onSubmit={handleSubmit}>
        <label>
            Location: 
            <input type="text" name="tripLocation" placeholder="Trip Location" value={formData.tripLocation} onChange={handleChange}/>
        </label>
        <br />
        <label>
            Image: 
            <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
        </label>
        <br />
        <label>
            Start Date: 
            <input type="date" name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange}/>
        </label>
        <br />
        <label>
            End Date: 
            <input type="date" name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange}/>
        </label>
        <br />
        <DescriptionLabel>
            Description: 
            <textarea name="tripDescription" placeholder="Description" value={formData.tripDescription} onChange={handleChange}></textarea>
        </DescriptionLabel>
        <br />
        <label>
            Attendees: 
            <input type="text" name="attendee" placeholder="Add Person" value={attendee} onChange={changePerson} />
            <AddPersonBtn type="button" onClick={addPerson}>+</AddPersonBtn>
        </label>
        <br />
        <Attendees attendees={formData.attendees}/>
        <br />
        <StyledButton type="submit">Add Trip to Bucket List</StyledButton>
        <br />
        {tempMsg && <TempMessage>{tempMsg}</TempMessage>}
        {!passVal && (
        <StyledMark>
          <p>Please fill in the following items and resubmit:</p>
          <ul>
            {missingItems().map(item=>
              <li key={item}>{item}</li>)}
          </ul>
        </StyledMark>
      )}
      </StyledForm>
    </IndivTripMain>
  );
}

export default NewTrip;
