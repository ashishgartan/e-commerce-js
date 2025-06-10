import { useState } from 'react';
import Login from './Login';     // Your existing login component
import Signup from './Signup';   // Your existing signup component

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                {isLogin ? <Login /> : <Signup />}

                <p className="text-center text-sm mt-4 text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        {isLogin ? "Sign Up" : "Login"} 
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;
