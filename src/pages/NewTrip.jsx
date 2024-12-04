import React, {useState} from "react";
import Attendees from "../components/Attendees";
import styled from "styled-components";
import { ConditionalHighlight } from "../MiscStyling";
import { useOutletContext } from "react-router-dom";

const NewTripContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;  

  form {
    display: flex;
    flex-direction: column;
    width: 55%;
    max-width: 800px;
    min-width: 700px;
  }

  label, button {
    font-size: 20px;
    position: relative;
    width: 100%;
    margin: 10px 0px 10px 0px;
    font-weight: bold;
  }

  input, textarea {
    position: absolute;
    width: 80%;
    right: 0;
    ${ConditionalHighlight};
  }

  textarea {
    height: 100px;
  }

  mark {
    background-color: var(--yellow);
    position: relative;
    left: 0;
    width: 100%;
  }

  button[type='button'] {
    position: absolute;
    right: 0;
    width: 30px;
    top: 0;
    margin: 0;
    border: 2px solid black;
    background-color: var(--dark-green);
  }

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
  const {onAddTrip} = useOutletContext();

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
        console.log("trying to add", attendee)

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
        onAddTrip(trip);
        setFormData(emptyObj);
        console.log("Added:", trip);
        showMessage(trip.location);
      })
      .catch(e=>console.error(e));
    }
  }

  return (
    <NewTripContainer>
      <h2>New Trip</h2>
      <form onSubmit={handleSubmit}>
        <label>
            Location: 
            <input type="text" name="location" placeholder="Trip Location" value={formData.location} onChange={handleChange}/>
        </label>
        <label>
            Image: 
            <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
        </label>
        <label>
            Start Date: 
            <input type="date" name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange}/>
        </label>
        <label>
            End Date: 
            <input type="date" name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange}/>
        </label>
        <DescriptionLabel>
            Description: 
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        </DescriptionLabel>
        <label>
            Attendees: 
            <input type="text" name="attendee" placeholder="Add Person" value={attendee} onChange={changePerson} />
            <button type="button" onClick={addPerson}>+</button>
        </label>
        <Attendees attendees={formData.attendees}/>
        <button type="submit">Add Trip to Bucket List</button>
        {tempMsg && <TempMessage>{tempMsg}</TempMessage>}
        {!passVal && (
        <mark>
          <p>Please fill in the following items and resubmit:</p>
          <ul>
            {missingItems().map(item=>
              <li key={item}>{item}</li>)}
          </ul>
        </mark>
      )}
      </form>
    </NewTripContainer>
  );
}

export default NewTrip;
