import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4 space-y-5">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty Cart"
        className="w-36 h-36 opacity-80 drop-shadow-md"
      />

      <h2 className="text-2xl font-medium text-gray-700">Your cart is empty</h2>

      <p className="text-gray-500 max-w-md">
        Looks like you haven’t added anything to your cart yet. Log in or sign
        up to start shopping!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={() => navigate("/auth/login")}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          <LoginIcon />
          Login
        </button>

        <button
          onClick={() => navigate("/auth/signup")}
          className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          <PersonAddIcon />
          Signup
        </button>
      </div>
    </div>
  );
}
