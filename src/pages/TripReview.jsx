import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import PhotoGallery from "../components/PhotoGallery";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { StyledForm, IndivTripMain, StyledButton } from "../MiscStyling";
import Stars from "../components/Stars"
import { formatDate, patchJSONToDb } from "../helper";

const DescriptionLabel = styled.label`
  padding-bottom: 100px;
`

const RatingLabel = styled.label`
  align-items: center;

  span {
    margin-left: 50px;
  }
`

const SubmittedReview = styled.div`
  background-color: var(--blue);
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 20px;
`

const TripReview = () => {
  const {trips, handleSaveReview, handleAddPhoto} = useOutletContext();

  const { id } = useParams(); 
  const trip = trips.find((trip) => trip.id === parseInt(id));

  const [review, setReview] = useState({
    reviewTitle: trip.reviewTitle ?? "",
    reviewDescription: trip.reviewDescription ?? "",
    rating: trip.rating ?? 0,
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
    handleSaveReview(id, review);
    setIsSubmitted(true);
  }

  const updateReview = async (tripId, reviewData) => {
    try {
      const updatedObj = {
        reviewTitle: reviewData.reviewTitle,
        rating: reviewData.rating,
        reviewDescription: reviewData.reviewDescription,
      }

      const response = await 
      patchJSONToDb("trips", tripId, updatedObj);

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
      <h1 className="review-title">Review Your Trip to {trip.tripLocation}</h1>
      <div className="trip-details">
        <p><strong>Trip Dates:</strong> {formatDate(trip.startDate)} to {formatDate(trip.endDate)}</p>
        <p><strong>Attendees:</strong> {trip.attendees.length > 0 ? trip.attendees.join(', ') : 'No attendees listed'}</p>
      </div>
      {isSubmitted ? (
        <SubmittedReview>
          <h2>Review Submitted!</h2>
          <p>{`Title: ${review.reviewTitle}`}</p>
          <p>{`Description: ${review.reviewDescription}`}</p>
          <p>{`Rating: ${review.rating}/5`}</p>
        </SubmittedReview>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <label>
            Review Title:
            <input
              type="text"
              name="reviewTitle"
              value={review.reviewTitle}
              onChange={handleChange}
              placeholder="Enter a title for your review"
              required
            />
          </label>
          <br />
          <DescriptionLabel>
            Description:
            <textarea
              name="reviewDescription"
              value={review.reviewDescription}
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