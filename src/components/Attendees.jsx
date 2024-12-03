import styled from "styled-components";

const NewAttendees = styled.div`
    display: flex;
    justify-content: end;

    span {
        padding: 0px 10px 0px 10px;
        margin: 10px 0px 10px 10px;
        background-color: var(--green);
        border: 2px solid var(--dark-green);
        border-radius: 5px;
        font-size: 15px;
    }
`
const Attendees = ({attendees}) => {
    return (
        <NewAttendees>
            {attendees.map(attendee=>
                <span key={attendee}>
                    {attendee}
                </span>
            )}
        </NewAttendees>
    );
}

export default Attendees;
