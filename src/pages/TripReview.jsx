import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import PhotoGallery from "../components/PhotoGallery";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { StyledForm, IndivTripMain, StyledButton } from "../MiscStyling";
import Stars from "../components/Stars"
import { formatDate } from "../helper";

const DescriptionLabel = styled.label`
  padding-bottom: 100px;
`

const RatingLabel = styled.label`
  align-items: center;

  span {
    margin-left: 50px;
  }
`

const TripReview = () => {
  const {trips, onSaveReview, handleAddPhoto} = useOutletContext();

  const { id } = useParams(); 
  const trip = trips.find((trip) => trip.id === parseInt(id)); 

  const [review, setReview] = useState({
    title: "",
    description: trip.review,
    rating: trip.rating,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!trip) {
    return <h2>Trip not found</h2>;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  }

  function handleStarClick(rating) {
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateReview(id, review);
    onSaveReview(id, review);
    setIsSubmitted(true);
  }

  const updateReview = async (tripId, reviewData) => {
    try {
      const response = await fetch(`http://localhost:6001/trips/${tripId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: reviewData.rating,
          review: reviewData.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedTrip = await response.json();
      console.log("Review updated:", updatedTrip);

    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  return (
    <IndivTripMain>
      <h1 className="review-title">Review Your Trip to {trip.location}</h1>
      <div className="trip-details">
        <p><strong>Trip Dates:</strong> {formatDate(trip.startDate)} to {formatDate(trip.endDate)}</p>
        <p><strong>Attendees:</strong> {trip.attendees.length > 0 ? trip.attendees.join(', ') : 'No attendees listed'}</p>
      </div>
      {isSubmitted ? (
        <div className="review-submitted">
          <h2>Review Submitted!</h2>
          <p>{`Title: ${review.title}`}</p>
          <p>{`Description: ${review.description}`}</p>
          <p>{`Rating: ${review.rating}/5`}</p>
        </div>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <label>
            Review Title:
            <input
              type="text"
              name="title"
              value={review.title}
              onChange={handleChange}
              placeholder="Enter a title for your review"
              required
            />
          </label>
          <br />
          <DescriptionLabel>
            Description:
            <textarea
              name="description"
              value={review.description}
              onChange={handleChange}
              placeholder="How was your trip?"
              required
            />
          </DescriptionLabel>
          <br />
            <RatingLabel>
              Rating:
              <Stars rating={review.rating} handleStarClick={handleStarClick}/>
            </RatingLabel>
          <br />
          <StyledButton type="submit">Submit Review</StyledButton>
        </StyledForm>
      )}
      <hr/>
      <UploadImage trip={trip} handleAddPhoto={handleAddPhoto}/>
      <PhotoGallery photos={trip.photos}/>
    </IndivTripMain>
  );
}

export default TripReview;