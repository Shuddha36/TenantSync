import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile/67f660f67cbba7f9581434f7");
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {profileData ? (
        <div>
          {profileData.profileImage && (
            <div className="mb-4">
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto"
              />
            </div>
          )}
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {profileData.username}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {profileData.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">First Name:</span> {profileData.firstName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Last Name:</span> {profileData.lastName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Phone:</span> {profileData.phone}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Address:</span> {profileData.address}
          </p>
          <p className="text-lg">
            <span className="font-semibold">About:</span> {profileData.about}
          </p>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/editprofile")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;