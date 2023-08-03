import React from "react";
import { UserAuth } from "../Context/AuthContext";

export default function User_Profile_Page() {
    const { user } = UserAuth();

    return (
        <div>
            <p>Welcome, {user?.displayName}</p>
            <p>User Email: {user?.email}</p>
        </div>
    );
}
