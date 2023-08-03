import React from "react";
import { useEffect } from "react";
import { UserAuth } from "../Context/AuthContext";
import { GoogleButton } from 'react-google-button';
import { useNavigate } from "react-router-dom";


export default function Login_Page() {

    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate('/')
        }
    }, [user])

    return (
        <div>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    );
};
