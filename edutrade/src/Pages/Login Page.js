import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Login_Page() {
    const { googleSignIn, user } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = UserAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password)
            navigate('/userprofile')
        } catch (e) {
            console.log(e.message)
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
        <div>
            <div>
                <h1 className='font-bold text-3xl'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type='email' />
                    </div>
                    <div>
                        <label className>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type='password' />
                    </div>
                    <button>
                        Sign In
                    </button>
                </form>
            </div>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
}
