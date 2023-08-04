import React, { useState } from 'react';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup_Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(email, password, username);
            navigate('/userprofile');
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='font-bold text-3xl'>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type='text' />
                </div>
                <div>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' />
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' />
                </div>
                <button>Sign Up</button>
            </form>
        </div>
    );
}

