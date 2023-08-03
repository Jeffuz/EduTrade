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
        <div class='flex w-screen h-auto bg-slate-50 pr-[10vw]'>
            <h3 class='m-auto ml-[5vw]'>EduTrade</h3>                

            <div class='bg-red-50 p-10'>

                {user?.displayName ? (
                    <button onClick={handleSignOut}>Logout</button>
                ) : (
                    <Link to='/login'>Login</Link>
                )}     

                <button class='pl-20'>Sign Up</button>            
            </div>

        </div>
    )
}

export default NavBar