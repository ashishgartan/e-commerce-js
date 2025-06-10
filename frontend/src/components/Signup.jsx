import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const [authMessageColor, setAuthMessageColor] = useState("green");

    const [authMessage, setAuthMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthMessage("");
        if (formData.password !== formData.confirmPassword) {
            setAuthMessage("Passwords do not match");
            setAuthMessageColor("red");
            return;
        }

        fetch("http://localhost:3000/auth/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Signup Failed");
                }
                return res.json(); // ✅ RETURN response JSON
            })
            .then(data => {
                console.log("Signup Successful:", data); // ✅ CLEAN LOGGING
                setAuthMessageColor("green");
                setAuthMessage("Signup Successful .Redirecting to login page.");

                setTimeout(() => {
                    navigate("/auth/login");  // Redirect after 2 seconds
                }, 2000);
                // Redirect or update UI here
            })
            .catch((error) => {
                console.error(error);
                setAuthMessageColor("red");
                setAuthMessage("Signup failed. Try again.");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
                {authMessage && (
                    <p className={`text-sm mb-4 text-center ${authMessageColor === "green" ? "text-green-500" : "text-red-500"}`}>
                        {authMessage}
                    </p>

                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
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
                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm mt-4 text-gray-600">
                    "Already have an account?"
                    <button
                        onClick={() => { navigate('/auth/login') }}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login
                    </button>
                </p>
            </div>

        </div >
    );
}

export default Signup;
