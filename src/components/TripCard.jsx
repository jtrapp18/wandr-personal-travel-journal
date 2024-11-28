import { Card } from "semantic-ui-react";
import { Navigate, useNavigate} from "react-router-dom";

const TripCard = ({id, location, complete}) => {
    const navigate = useNavigate();

    function handleClick() {
        complete ? navigate(`/review/${id}`) : navigate(`/itinerary/${id}`);
    }

    return (
        <Card onClick={handleClick}>
            <p>{location}</p>
            <p>{complete ? "Complete" : "On bucket list"}</p>
        </Card>
    );
}

export default TripCard;
