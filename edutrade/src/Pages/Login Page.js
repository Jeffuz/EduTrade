import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function Login_Page() {
    const { googleSignIn, user } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = UserAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate('/userprofile');
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate('/userprofile');
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[79.75vh] bg-blue-100">
            <div className="bg-blue-200 p-8 rounded-lg shadow-md w-96">
                <h1 className="text-blue-800 text-3xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-blue-800">Email Address</label>
                        <input
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="mt-1 block w-full rounded-md bg-blue-50 text-blue-800 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-blue-800">Password</label>
                        <input
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="mt-1 block w-full rounded-md bg-blue-50 text-blue-800 border-blue-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
                    >
                        Sign In
                    </button>
                </form>
            </div>
            <button
                onClick={handleGoogleSignIn}
                className="mt-4 flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <FcGoogle className="mr-2" /> Sign In with Google
            </button>
        </div>
    );
}
