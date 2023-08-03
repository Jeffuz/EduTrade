import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';

const NavBar = () => {
    const { user, logOut } = UserAuth()
    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex justify-between items-center h-24 max-w-[1500px] mx-auto px-4'>
            <Link to='/' className='font-bold text-3xl'>EduTrade</Link>
            <div>
                {user?.email ? (
                    <button onClick={handleSignOut}>Logout</button>
                ) : (
                    <div>
                        <Link to='/login' className='p-4'>Login</Link>
                        <Link to="/signup" className='p-4'>Sign Up</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar