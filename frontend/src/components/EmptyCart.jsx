import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6">
            <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty Cart"
                className="w-40 h-40 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-700">Your cart is empty!</h2>
            <div className="flex space-x-8 mt-4">
                <div
                    onClick={() => navigate('/login')}
                    className="flex flex-col items-center cursor-pointer hover:text-indigo-600"
                >
                    <LoginIcon fontSize="large" />
                    <span className="mt-1">Login</span>
                </div>
                <div
                    onClick={() => navigate('/signup')}
                    className="flex flex-col items-center cursor-pointer hover:text-indigo-600"
                >
                    <PersonAddIcon fontSize="large" />
                    <span className="mt-1">Signup</span>
                </div>
            </div>
        </div>
    );
}
