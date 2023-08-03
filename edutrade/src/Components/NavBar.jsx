import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import SignupButtonComponent from './SignupButtonComponent';

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
        <div>
            {user?.displayName ? (
                <button onClick={handleSignOut}>Logout</button>
            ) : (
                <Link to='/login'>Login</Link>
            )}
            <SignupButtonComponent/>
        </div>
    )
}

export default NavBar