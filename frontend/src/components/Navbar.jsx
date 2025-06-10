import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../store/userSlice'; // adjust path
import { useNavigate } from 'react-router-dom';




export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.items);
    return (
        <nav className="bg-indigo-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
            {/* Logo and Menu */}
            <div className="flex items-center space-x-3">
                <MenuIcon className="cursor-pointer hover:text-indigo-200" />
                <span className="text-2xl font-bold text-white tracking-wide">MyApp</span>
            </div>

            {/*Search bar*/}
            {user.loggedIn ? (
                <LogoutIcon
                    className="cursor-pointer hover:text-slate-300"
                    onClick={() => {
                        dispatch(logout());
                        navigate('/auth/logout'); // or homepage
                    }}
                    titleAccess="Logout"
                />
            ) : (
                <LoginIcon
                    className="cursor-pointer hover:text-slate-300"
                    onClick={() => navigate('/auth/login')}
                    titleAccess="Login"
                />
            )}

            <div></div>
            {/* Navigation Icons */}
            <div className="flex space-x-6">
                <Link to={'/home'}>
                    <HomeIcon className="cursor-pointer hover:text-slate-200 transition-colors duration-200" titleAccess="Home" />
                </Link>
                <Link to={'/about'}>
                    <InfoIcon className="cursor-pointer hover:text-slate-200 transition-colors duration-200" titleAccess="About" />
                </Link>
                <Link to={'/contactus'}>
                    <ContactPageIcon className="cursor-pointer hover:text-slate-200 transition-colors duration-200" titleAccess="Contact" />
                </Link>
            </div>
            <div>
                <Link to={'/cart'}>
                    <Badge badgeContent={cartItems.length} color="primary" >
                        <ShoppingCartIcon />
                    </Badge>
                </Link>

            </div>
        </nav>
    );
}
