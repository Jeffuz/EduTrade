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
        <div>
            <input
                type="text"
                value={newUsername}
                onChange={handleUsernameChange}
                placeholder="Enter new username"
            />
            <button onClick={handleUsernameUpdate}>Update Username</button>
        </div>
    );
}