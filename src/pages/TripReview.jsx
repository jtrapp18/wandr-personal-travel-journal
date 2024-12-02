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

  function handleSubmit(event) {
    event.preventDefault();
    onSaveReview(id, review); 
    setIsSubmitted(true); 
  }

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
            <select
              name="rating" //will eventially change this to be something other than number review (suitcase emoji?)
              value={review.rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a rating 
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Submit Review</button>
        </form>
      )}
    </main>
  );
};

export default TripReview;