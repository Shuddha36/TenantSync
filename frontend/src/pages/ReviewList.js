import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewList({ propertyId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(`http://localhost:4000/api/reviews/${propertyId}`);
        setReviews(response.data); // Set reviews for the property
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
            <p>{review.reviewText}</p>
            {/* Optionally, you could add more details like the reviewer name or date */}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}