import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EmptyCart() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user); // Check auth state

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty Cart"
        className="w-36 h-36 opacity-90 drop-shadow-md mb-6 animate-bounce"
      />

      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
        Oops! Your cart is empty
      </h2>

      <p className="text-gray-600 max-w-md text-lg">
        {user
          ? "Start exploring and add your favorite products to the cart."
          : "Log in or sign up to start adding items to your cart!"}
      </p>

      {!user && (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/auth/login")}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            <LoginIcon />
            Login
          </button>

          <button
            onClick={() => navigate("/auth/signup")}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <PersonAddIcon />
            Signup
          </button>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition-all duration-200"
      >
        🛍️ Continue Shopping
      </button>
    </div>
  );
}
