import React from "react";
import { UserAuth } from "../Context/AuthContext";

export default function User_Profile_Page() {
    const { user } = UserAuth();

    return (
        <div className="flex justify-center p-[18.65%]">
            <img
                src={user.photoURL}
                alt=""
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <div className="p-4">
                <p className="font-bold text-4xl ">{user?.displayName}</p>
                <p>Email: {user?.email}</p>
            </div>
        </div>
    );
}
