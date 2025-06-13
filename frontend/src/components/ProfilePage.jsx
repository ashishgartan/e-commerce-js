import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/user/id/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div
      className="profile-page"
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={user.avatar || "https://via.placeholder.com/100"}
          alt="User Avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            marginBottom: 16,
          }}
        />
        <h2>{user.name}</h2>
        <p style={{ color: "#888" }}>{user.email}</p>
      </div>
      <div style={{ marginTop: 24 }}>
        <h4>Profile Details</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
