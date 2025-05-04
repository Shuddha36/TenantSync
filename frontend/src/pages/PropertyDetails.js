// src/pages/PropertyDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const PropertyDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsRefresh, setReviewsRefresh] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/reviews/${id}`);
      setReviews(res.data.reviews);
    } catch (err) {
      // No-op
    }
  };

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/properties/${id}`);
      setProperty(res.data.property);
    } catch (err) {
      console.error("Error fetching property:", err);
    }
  };

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:4000/api/comments/${id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setComments(data);
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/session",
        {
          withCredentials: true,
        }
      );
      if (response.data.loggedIn) {
        setUserId(response.data.user.id);
      }
    } catch (error) {
      console.error("Failed to fetch user session:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    const res = await fetch(`http://localhost:4000/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: newComment }),
    });
    if (res.ok) {
      setNewComment("");
      fetchComments();
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!newComment.trim()) return;
    const res = await fetch(
      `http://localhost:4000/api/comments/${commentId}/reply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
      }
    );
    if (res.ok) {
      setNewComment("");
      setReplyingTo(null);
      fetchComments();
    }
  };

  const handleLikeDislike = async (commentId, type) => {
    await fetch(`http://localhost:4000/api/comments/${type}/${commentId}`, {
      method: "POST",
      credentials: "include",
    });
    fetchComments();
  };

  const handleEditSubmit = async (commentId) => {
    await fetch(`http://localhost:4000/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: editedContent }),
    });
    setEditingCommentId(null);
    setEditedContent("");
    fetchComments();
  };

  const handleDelete = async (commentId) => {
    await fetch(`http://localhost:4000/api/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchComments();
  };

  const handleAddToWishlist = async () => {
    if (!userId) {
      alert("You must be logged in to add to wishlist.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/wishlist", {
        userId,
        propertyId: property._id,
      });
      alert(response.data.message || "Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      alert("Failed to add to wishlist. Please try again.");
    }
  };

  useEffect(() => {
    fetchProperty();
    fetchComments();
    fetchUserId();
    fetchReviews();
  }, [id]);

  if (!property) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-2">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-blue-100 mt-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-900 tracking-tight">
          {property.houseName}
        </h1>
        <img
          src={`http://localhost:4000${property.image}`}
          alt={property.houseName}
          className="w-full rounded-lg mb-4 border border-blue-200 shadow-sm"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-blue-700 font-semibold">Address:</p>
            <p className="text-blue-800 mb-2">{property.address}</p>
            <p className="text-blue-700 font-semibold">Owner:</p>
            <p className="text-blue-800 mb-2">{property.owner.username}</p>
            <p className="text-blue-700 font-semibold">Contact:</p>
            <p className="text-blue-800 mb-2">
              {property.owner.phone || property.owner.email}
            </p>
            <p className="text-blue-700 font-semibold">Square Feet:</p>
            <p className="text-blue-800 mb-2">{property.squareFeet}</p>
            <p className="text-blue-700 font-semibold">Price:</p>
            <p className="text-blue-800 mb-2">{property.price}৳</p>
          </div>
          <div>
            <p className="text-blue-700 font-semibold">Rooms:</p>
            <p className="text-blue-800 mb-2">{property.rooms}</p>
            <p className="text-blue-700 font-semibold">Kitchens:</p>
            <p className="text-blue-800 mb-2">{property.kitchens}</p>
            <p className="text-blue-700 font-semibold">Washrooms:</p>
            <p className="text-blue-800 mb-2">{property.washrooms}</p>
            <p className="text-blue-700 font-semibold">Bedrooms:</p>
            <p className="text-blue-800 mb-2">{property.bedrooms}</p>
          </div>
        </div>
        <p className="text-xs text-blue-400 mb-6">
          Posted: {moment(property.createdAt).fromNow()}
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => navigate("/payment", { state: { property, user } })}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Rent Now
          </button>
          <button
            onClick={handleAddToWishlist}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            Add to Wishlist
          </button>
          <Link
            to={`/report/${property._id}`}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Report
          </Link>
        </div>
        <hr className="my-8 border-blue-100" />
        {/* FAQ Section */}
        {/* Review Section */}
        {userId && (
          <div className="mt-8">
            <ReviewList reviews={reviews} refreshReviews={fetchReviews} />
          </div>
        )}
        <div className="mt-8">
          <ReviewForm
            propertyId={id}
            userId={userId}
            onReviewAdded={fetchReviews}
          />
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900 tracking-tight text-center">
            FAQ Section
          </h2>
          <textarea
            className="w-full border border-blue-200 bg-blue-50 rounded-xl p-3 mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900 placeholder-blue-300 shadow-sm transition"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              replyingTo ? "Answering a question..." : "Add a Question here..."
            }
          ></textarea>
          <div className="flex gap-2 mb-4 justify-end">
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={
                replyingTo
                  ? () => handleReplySubmit(replyingTo)
                  : handleCommentSubmit
              }
            >
              {replyingTo ? "Reply" : "Post"}
            </button>
            <button
              className="text-sm text-blue-400 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
              onClick={() => {
                setReplyingTo(null);
                setNewComment("");
              }}
            >
              Cancel
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className="border border-blue-100 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm"
              >
                <div className="text-xs text-blue-500 mb-1 flex items-center gap-2">
                  <span className="font-semibold text-blue-700">
                    {c.author?.username || "Unknown"}
                  </span>
                  <span className="text-blue-300">•</span>
                  <span>{moment(c.createdAt).fromNow()}</span>
                </div>
                {editingCommentId === c._id ? (
                  <>
                    <textarea
                      className="w-full border border-blue-200 bg-blue-50 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-blue-900 placeholder-blue-300 shadow-sm"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 text-sm font-semibold shadow"
                        onClick={() => handleEditSubmit(c._id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-sm text-blue-400 hover:text-blue-600 px-3 py-1 rounded-lg transition-colors"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditedContent("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="mb-2 text-blue-900 text-base leading-relaxed">
                    {c.content}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 text-xs text-blue-600 mt-1">
                  <span
                    className="cursor-pointer hover:text-blue-800"
                    onClick={() => handleLikeDislike(c._id, "like")}
                  >
                    👍 {c.likes.length}
                  </span>
                  <span
                    className="cursor-pointer hover:text-blue-800"
                    onClick={() => handleLikeDislike(c._id, "dislike")}
                  >
                    👎 {c.dislikes.length}
                  </span>
                  <span
                    className="cursor-pointer hover:text-blue-800"
                    onClick={() => {
                      setReplyingTo(c._id);
                      setNewComment("");
                    }}
                  >
                    Reply
                  </span>
                  <span
                    className="cursor-pointer text-yellow-700 hover:text-yellow-800"
                    onClick={() => {
                      setEditingCommentId(c._id);
                      setEditedContent(c.content);
                    }}
                  >
                    Edit
                  </span>
                  <span
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </span>
                </div>
                {c.replies?.map((r) => (
                  <div
                    key={r._id}
                    className="ml-6 mt-3 text-sm border-l-4 border-blue-200 pl-4 italic bg-blue-100 rounded-xl py-2"
                  >
                    <strong className="text-blue-700">
                      {r.author?.username}:
                    </strong>{" "}
                    {r.content}{" "}
                    <span className="text-xs text-blue-400">
                      {moment(r.createdAt).fromNow()}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
