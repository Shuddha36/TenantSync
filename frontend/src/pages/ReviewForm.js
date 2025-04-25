import React, { useState } from "react";
//import RatingStars from "../components/RatingStars";
import axios from "axios";

export default function ReviewForm({ propertyId }) {
  const [rating, setRating] = useState(0); // User's selected rating
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "") {
      setError("Please provide a rating and a review.");
      return;
    }

    try {
      // Submit review (adjust this API endpoint)
      await axios.post(`http://localhost:4000/api/reviews/${propertyId}`, { rating, reviewText });
      setSuccess("Review submitted successfully!");
      setRating(0);
      setReviewText("");
    } catch (err) {
      setError("There was an error submitting your review.");
    }
  };

  return (
    <div className="review-form">
      <form onSubmit={handleSubmit}>
        <h3>Write a Review</h3>
        <div>
          <label>Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-8 h-8 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setRating(star)}
              >
                <path d="M10 15l-3.5 2.6 1-4.2-3.5-3.3 4.3-.4L10 3l1.7 6.3 4.3.4-3.5 3.3 1 4.2L10 15z" />
              </svg>
            ))}
          </div>
        </div>
        <div>
          <label>Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            placeholder="Write your review here..."
          />
        </div>
        <button type="submit">Submit Review</button>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
      </form>
    </div>
  );
}