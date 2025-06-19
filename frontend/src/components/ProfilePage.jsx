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

  if (loadingUser) return <div>Loading profile...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div
      className="profile-container"
      style={{
        maxWidth: 800,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 12,
        backgroundColor: "#fdfdfd",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Avatar and Basic Info */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <img
          src={user.profile || "https://via.placeholder.com/100"}
          alt="User Avatar"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #eee",
          }}
        />
        <h2 style={{ margin: "16px 0 8px" }}>{user.name}</h2>
        <p style={{ color: "#666" }}>{user.email}</p>
      </div>

      {/* Detailed Information */}
      <div style={{ padding: "0 16px" }}>
        <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: 8 }}>
          Account Details
        </h3>
        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>Joined On:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </li>
          {user.role && (
            <li>
              <strong>Role:</strong> {user.role}
            </li>
          )}
          {user.phone && (
            <li>
              <strong>Phone:</strong> {user.phone}
            </li>
          )}
          {user.location && (
            <li>
              <strong>Location:</strong> {user.location}
            </li>
          )}
        </ul>
      </div>

      {/* Bio Section */}
      {user.bio && (
        <div style={{ padding: "0 16px", marginTop: 32 }}>
          <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: 8 }}>
            Bio
          </h3>
          <p style={{ marginTop: 12, lineHeight: "1.6", color: "#333" }}>
            {user.bio}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
