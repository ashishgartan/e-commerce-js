import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

// MUI icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import StoreIcon from "@mui/icons-material/Store";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const cartItems = useSelector((state) => state.cart.items || []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // optional but good practice
    navigate("/home"); // redirect after logout
  };

  return (
    <nav className="bg-indigo-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo and Menu */}
      <div className="flex items-center space-x-3">
        <MenuIcon className="cursor-pointer hover:text-indigo-200" />
        <span className="text-2xl font-bold tracking-wide">ShopZone</span>
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-6">
        <Link to="/home" title="Home">
          <HomeIcon className="cursor-pointer hover:text-slate-200" />
        </Link>
        <Link to="/about" title="About">
          <InfoIcon className="cursor-pointer hover:text-slate-200" />
        </Link>
        <Link to="/contactus" title="Contact">
          <ContactPageIcon className="cursor-pointer hover:text-slate-200" />
        </Link>
        <Link to="/cart" title="Cart">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon className="cursor-pointer" />
          </Badge>
        </Link>
        {user && isLoggedIn ? (
          <>
            {user.role === "seller" ? (
              <button
                className="flex items-center space-x-1 cursor-pointer hover:text-slate-300 bg-transparent border-none"
                onClick={() => {
                  navigate(`/seller/sellerstore/${user._id}`);
                }}
                title="Seller Store"
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <StoreIcon titleAccess="sellerStorePanel" />
                <span className="text-sm">Store</span>
              </button>
            ) : (
              <></>
            )}
            {user.role === "admin" ? (
              <button
                className="flex items-center space-x-1 cursor-pointer hover:text-slate-300 bg-transparent border-none"
                onClick={() => {
                  navigate("/adminPanel");
                }}
                title="Admin Panel"
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <AdminPanelSettingsIcon titleAccess="AdminPanel" />
                <span className="text-sm">Admin Panel</span>
              </button>
            ) : (
              <></>
            )}
            <Avatar
              alt={user.name || "User"}
              src={user.profile || "https://picsum.photos/200/300"}
              sx={{ width: 32, height: 32, marginLeft: 1, marginRight: 1 }}
              onClick={() => {
                navigate("/profile/" + user._id);
                console.log("Navigating to profile:", user._id);
              }}
              className="cursor-pointer hover:opacity-80"
              title="Profile"
            />
            <button
              className="flex items-center space-x-1 cursor-pointer hover:text-slate-300 bg-transparent border-none"
              onClick={handleLogout}
              title="Logout"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <LogoutIcon titleAccess="Logout" />
              <span className="text-sm">Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-1 cursor-pointer hover:text-slate-300 bg-transparent border-none"
              onClick={() => navigate("/auth/login")}
              title="Login"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <LoginIcon titleAccess="Login" />
              <span className="text-sm">Login</span>
            </button>
            <button
              className="flex items-center space-x-1 cursor-pointer hover:text-slate-300 bg-transparent border-none"
              onClick={() => navigate("/auth/signup")}
              title="Sign Up"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <PersonAddIcon titleAccess="Sign Up" />
              <span className="text-sm">Sign Up</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
