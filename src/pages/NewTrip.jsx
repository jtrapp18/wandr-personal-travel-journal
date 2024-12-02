import React, {useState} from "react";

function NewTrip({onAddTrip}) {
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
        attendees: [],
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
    <div id="new-trip-container">
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
        <label id="new-trip-descr">
            Description: 
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        </label>
        <label id="new-attendee">
            Attendees: 
            <input type="text" name="attendee" placeholder="Add Person" value={attendee} onChange={changePerson} />
            <button onClick={addPerson}>+</button>
        </label>
        <div id="new-attendees">
        {formData.attendees.map(attendee=>
            <span key={attendee}>
                {attendee}
            </span>
        )}
        </div>
        <button type="submit">Add Trip to Bucket List</button>
        {tempMsg && <p className="tempMsg">{tempMsg}</p>}
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
    </div>
  );
}

export default NewTrip;
