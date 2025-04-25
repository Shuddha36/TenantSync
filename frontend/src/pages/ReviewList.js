import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewList({ propertyId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/reviews/${propertyId}`
        );
        setReviews(response.data.reviews); // Use the correct response shape
      } catch (err) {
        setError("Error fetching reviews.");
      }
    }
    fetchReviews();
  }, [propertyId]);

  return (
    <div className="review-list">
      {error && <div>{error}</div>}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review">
            <p>
              <strong>{review.userId?.username || "User"}</strong> (
              {review.rating} Stars)
            </p>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
