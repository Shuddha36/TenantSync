import React, { useState } from "react";
import axios from "axios";

export default function ReviewForm({ propertyId, userId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
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
      await axios.post("http://localhost:4000/api/reviews/add", {
        propertyId,
        userId,
        rating,
        comment: reviewText,
      });
      setSuccess("Review submitted successfully!");
      setRating(0);
      setReviewText("");
      setError("");
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "There was an error submitting your review."
      );
    }
  };

  return (
    <div className="review-form max-w-md bg-white p-6 rounded-lg shadow-md mt-4">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Write a Review
        </h3>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-8 h-8 cursor-pointer transition-colors duration-150 ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              >
                <path d="M10 15l-3.5 2.6 1-4.2-3.5-3.3 4.3-.4L10 3l1.7 6.3 4.3.4-3.5 3.3 1 4.2L10 15z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            placeholder="Write your review here..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Submit Review
        </button>
        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
        {success && (
          <div className="mt-2 text-green-600 text-sm">{success}</div>
        )}
      </form>
    </div>
  );
}
