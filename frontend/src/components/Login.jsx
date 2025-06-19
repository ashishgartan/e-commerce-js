import { useState } from "react";
import { login } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { syncCartToBackend } from "../store/cartSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [authMessage, setAuthMessage] = useState("");
  const [authMessageColor, setAuthMessageColor] = useState("green");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthMessage("");

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login Failed");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        dispatch(login(data.user));
        setAuthMessage("Login successful.");
        setAuthMessageColor("green");
        dispatch(syncCartToBackend(cart.items));
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((error) => {
        console.error(error);
        setAuthMessage("Invalid email or password.");
        setAuthMessageColor("red");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {authMessage && (
          <p
            className={`text-sm mb-4 text-center ${
              authMessageColor === "green" ? "text-green-500" : "text-red-500"
            }`}
          >
            {authMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/auth/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
