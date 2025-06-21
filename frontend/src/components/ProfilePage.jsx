import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("❌ Failed to load user:", err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loadingUser)
    return (
      <div className="text-center mt-10 text-gray-500">Loading profile...</div>
    );
  if (!user)
    return <div className="text-center mt-10 text-red-500">User not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-10 p-8 space-y-6">
      {/* Avatar and Name */}
      <div className="flex flex-col items-center">
        <img
          src={user.profile || "https://via.placeholder.com/120"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Account Details */}
      <div>
        <h3 className="text-lg font-semibold border-b pb-2 text-gray-700">
          Account Details
        </h3>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>
            <span className="font-medium">Username:</span> {user.username}
          </li>
          <li>
            <span className="font-medium">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </li>
          {user.role && (
            <li>
              <span className="font-medium">Role:</span> {user.role}
            </li>
          )}
          {user.phone && (
            <li>
              <span className="font-medium">Phone:</span> {user.phone}
            </li>
          )}
          {user.location && (
            <li>
              <span className="font-medium">Location:</span> {user.location}
            </li>
          )}
        </ul>
      </div>

      {/* Bio */}
      {user.bio && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 text-gray-700">
            Bio
          </h3>
          <p className="mt-3 text-gray-800 leading-relaxed">{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
