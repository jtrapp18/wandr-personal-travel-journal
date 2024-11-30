import { Card } from "semantic-ui-react";
import { Navigate, useNavigate} from "react-router-dom";

const TripCard = ({id, image, location, startDate, endDate, complete, rating}) => {
    const navigate = useNavigate();

    function handleClick() {
        complete ? navigate(`/review/${id}`) : navigate(`/itinerary/${id}`);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    const stars = {
        0: "☆☆☆☆☆",
        1: "★☆☆☆☆",
        2: "★★☆☆☆",
        3: "★★★☆☆",
        4: "★★★★☆",
        5: "★★★★★"
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
            {/* <details>
                <p>{`Rating: ${stars[rating]}`}</p>
            </details> */}
        </article>
    );
}

export default TripCard;
