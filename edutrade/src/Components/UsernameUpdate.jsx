import React, { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";

export default function UsernameUpdate() {
    const { user } = UserAuth();
    const [newUsername, setNewUsername] = useState("");

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleUsernameUpdate = async () => {
        try {
            await updateProfile(user, { displayName: newUsername });
            console.log("Username updated successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-1">
            <input
                type="text"
                value={newUsername}
                onChange={handleUsernameChange}
                placeholder="Enter new username"
                className="bg-blue-50 mb-2 px-4 py-2 rounded-md"
            />
            <button className='bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700' onClick={handleUsernameUpdate}>Update Username</button>
        </div>
    );
}