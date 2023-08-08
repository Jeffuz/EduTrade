import React from "react";
import { UserAuth } from "../Context/AuthContext";
import UsernameUpdate from "../Components/UsernameUpdate";
import ProfilePictureUpdate from "../Components/ProfilePictureUpdate";
import CreateItemButton from "../Components/CreateItemButton";
export default function User_Profile_Page() {
    const { user } = UserAuth();

    return (
        <div className="flex justify-center items-center p-[18%]">
            <ProfilePictureUpdate />
            <div className="p-4">
                <p className="font-bold text-4xl ">{user?.displayName}</p>
                <p>Email: {user?.email}</p>
                <UsernameUpdate />
            </div>
            {!user?.email? (null): <CreateItemButton/>}
        </div>
    );
}
