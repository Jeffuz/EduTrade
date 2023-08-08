import React, { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../Context/AuthContext";
import { storage } from "../Firebase";

export default function ProfilePictureUpdate() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { user, updateProfile } = UserAuth();
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);
    };

    const handleImageUpload = async () => {
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: downloadURL });
        setSelectedImage(null);
        window.location.reload();
    };

    return (
        <div>
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : user.photoURL || "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"}
                    alt=""
                    style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    className="ease-in-out duration-300 hover:blur-sm"
                />
            </label>
            <input
                id="fileInput"
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
            {selectedImage && <button onClick={handleImageUpload}>Upload Image</button>}
        </div>
    );
}
