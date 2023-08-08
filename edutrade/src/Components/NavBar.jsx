import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import { BiMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from 'react-icons/cg';

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
                    <div className='flex justify-center items-center'>
                        <Link to="/message" className='p-4'><BiMessageSquareDetail size={25} /></Link>
                        <Link to="/userprofile " className='p-4'>
                            <img src={user.photoURL} alt='Profile' className='w-8 h-8 rounded-full' />
                        </Link>
                        <button onClick={handleSignOut} className='p-4'>Logout</button>
                    </div>
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