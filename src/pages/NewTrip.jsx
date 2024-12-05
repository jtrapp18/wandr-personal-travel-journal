import React, {useState} from "react";
import Attendees from "../components/Attendees";
import styled from "styled-components";
import { IndivTripMain, StyledForm, StyledButton } from "../MiscStyling";
import { useOutletContext } from "react-router-dom";

const StyledMark = styled.mark`
    background-color: var(--yellow);
    position: relative;
    left: 0;
    width: 100%;
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

const DescriptionLabel = styled.label`
  padding-bottom: 100px;
`

const TempMessage = styled.p`
  font-size: 25px;
  color: var(--dark-green);
  font-style: italic;
`

function NewTrip() {
  const {addTrip} = useOutletContext();

  const emptyObj = {
      image: "",
      startDate: "",
      endDate: "",
      location: "",
      attendees: [],
      description: "",
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

    const showMessage = (location) => {
        setTempMsg(`Added ${location} to Bucket List!`);

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
        ...formData,
        rating: 0,
        review: "",
        photos: [],
        complete: false,
      }

      fetch("http://localhost:6001/trips", {
        method: "POST",
        headers: {"Content-Type": "Application/JSON"},
        body: JSON.stringify(newTrip)
      })
      .then(res=>res.json())
      .then(trip=>{
        addTrip(trip);
        setFormData(emptyObj);
        console.log("Added:", trip);
        showMessage(trip.location);
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
            <input type="text" name="location" placeholder="Trip Location" value={formData.location} onChange={handleChange}/>
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
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
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
