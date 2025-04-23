import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReportForm = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ propertyId: id, description }),
    });
    if (res.ok) {
      alert("Report submitted successfully");
      navigate("/");
    } else {
      alert("Failed to submit report");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Report Property</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded mb-4"
          rows="5"
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;