import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TripReview = ({ trips, onSaveReview }) => {
  const { id } = useParams(); 
  const trip = trips.find((trip) => trip.id === parseInt(id)); 

  const [review, setReview] = useState({
    title: "",
    description: "",
    rating: 0,
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
    <main>
      <h1>Review Your Trip to {trip.location}</h1>
      {isSubmitted ? (
        <div>
          <h2>Review Submitted!</h2>
          <p>{`Title: ${review.title}`}</p>
          <p>{`Description: ${review.description}`}</p>
          <p>{`Rating: ${review.rating}/5`}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
          <label>
            Description:
            <textarea
              name="description"
              value={review.description}
              onChange={handleChange}
              placeholder="How was your trip?"
              required
            />
          </label>
          <br />
          <label>
            Rating:
            <div className="rating-filter">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`star ${review.rating > index ? "filled" : ""}`}
                  onClick={() => handleStarClick(index + 1)}
                >
                  ★
                </span>
              ))}
            </div>
          </label>
          <br />
          <button type="submit">Submit Review</button>
        </form>
      )}
    </main>
  );
};

export default TripReview;