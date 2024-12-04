import { useNavigate} from "react-router-dom";
import { formatDate } from "../helper";
import Attendees from "./Attendees";
import styled from "styled-components";
import { isPastDate } from "../helper";

const StyledTripCard = styled.article`
    height: 300px;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;

    img {
        width: 100%;
        height: 85%;
        object-fit: cover;
        overflow: hidden;
        border-radius: 5px;
        cursor: pointer;
    }

    h2 {
        position: absolute;
        background-color: rgba(0,0,0,.5);
        margin-left: 5px;
        color: white;
    }

    p.globe {
        bottom: 0px;
        right: 0px;
        font-size: 25px;
        height: 15%;
    }

    .grayscale {
        filter: grayscale(100%) brightness(1.2);
    }

    details p {
      color: var(--dark-green);
    }

    &:hover h2 {
      zoom: 130%;
    }

    details summary:hover {
        font-weight: bold;
    }

    &:has(details[open]) {
        padding-bottom: 75px;
    }
`

const TripInfo = styled.div`
  display: flex;
  justify-content: space-between;
`
TripInfo.displayName = 'trip-info'

const GlobeContainer = styled.div`
  justify-content: left;
`

const TripCard = ({id, image, location, description, startDate, endDate, attendees, rating}) => {
    const navigate = useNavigate();

    function handleClick() {
        isPastDate(endDate) ? navigate(`/review/${id}`) : navigate(`/itinerary/${id}`);
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

    if (isPastDate(endDate)) {
        addlDetails = 
            <p>
                {`Rating: ${stars[rating]}`}
            </p>
    }
    else {
        addlDetails = null
    }

    return (
        <StyledTripCard>
            <h2>{location}</h2>
            <img src={image} alt={image} onClick={handleClick} />
            <TripInfo>
                <div>
                    <p>{`${formatDate(startDate)}-${formatDate(endDate)}`}</p>
                </div>
                <GlobeContainer>
                    <p className={isPastDate(endDate) ? "globe" : "globe grayscale"}>🌍</p>
                </GlobeContainer>
            </TripInfo>
            <details>
                <summary>Details</summary>
                <p>{description}</p>
                <Attendees attendees={attendees}/>
                {addlDetails}
            </details>
        </StyledTripCard>
    );
}

export default TripCard;
