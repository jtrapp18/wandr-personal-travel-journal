
const Attendees = ({attendees}) => {
    return (
        <div id="new-attendees">
            {attendees.map(attendee=>
                <span key={attendee}>
                    {attendee}
                </span>
            )}
        </div>
    );
}

export default Attendees;
