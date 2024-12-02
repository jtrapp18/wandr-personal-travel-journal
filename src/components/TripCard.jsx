import { Navigate, useNavigate} from "react-router-dom";
import { formatDate } from "../helper";
import Attendees from "./Attendees";

const TripCard = ({id, image, location, description, startDate, endDate, attendees, complete, rating}) => {
    const navigate = useNavigate();

    function handleClick() {
        complete ? navigate(`/review/${id}`) : navigate(`/itinerary/${id}`);
    }

    const stars = {
        0: "☆☆☆☆☆",
        1: "★☆☆☆☆",
        2: "★★☆☆☆",
        3: "★★★☆☆",
        4: "★★★★☆",
        5: "★★★★★"
    }

    let addlDetails

    if (complete) {
        addlDetails = 
            <p>
                {`Rating: ${stars[rating]}`}
            </p>
    }
    else {
        addlDetails = null
    }

    return (
        <article className="trip-card" >
            <h2>{location}</h2>
            <img src={image} alt={image} onClick={handleClick} />
            <div className="trip-info-container">
                <div>
                    <p>{`${formatDate(startDate)}-${formatDate(endDate)}`}</p>
                </div>
                <div className="globe-container">
                    <p className={complete ? "globe" : "globe grayscale"}>🌍</p>
                </div>
            </div>
            <details>
                <p>{description}</p>
                <Attendees attendees={attendees}/>
                {addlDetails}
            </details>
        </article>
    );
}

export default TripCard;
