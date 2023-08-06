import React, { useState } from "react";
import {
  firestore,
  firestoreCollection,
  firestoreAddDoc,
  firestoreServerTimestamp,
  storage,
  firestoreRef, // Import ref
  firestoreUploadBytes, // Import uploadBytes
  firestoreGetDownloadURL, // Import getDownloadURL
} from '../Firebase';

export default function Post({ isOpen, onClose }) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [postOption, setPostOption] = useState("text");
  const [linkUrl, setLinkUrl] = useState("");

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };
  
  const handlePostSubmit = async () => {
    if (postTitle.trim() !== "") {
      try {
        const postRef = firestoreCollection(firestore, "posts");
        const postData = {
          title: postTitle,
          timestamp: firestoreServerTimestamp(),
        };

        if (postOption === "text") {
          postData.content = postContent;
        } else if (postOption === "image") {
          if (selectedImage) {
            const imageRef = firestoreRef(storage, `images/${selectedImage.name}`);
            await firestoreUploadBytes(imageRef, selectedImage);
            const imageUrl = await firestoreGetDownloadURL(imageRef);
            postData.image = imageUrl;
          }
        } else if (postOption === "link") {
          postData.link = linkUrl;
        }

        await firestoreAddDoc(postRef, postData);
        setPostTitle("");
        setPostContent("");
        setSelectedImage(null);
        setPostOption("text");
        setLinkUrl("");
        onClose();
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-80 rounded">
        <input
          type="text"
          className="w-full border border-gray-300 p-2 mb-2 rounded"
          placeholder="Enter post title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <div className="flex space-x-4 mb-2">
          <button
            className={`px-4 py-2 rounded font-bold ${
              postOption === "text" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-700"
            } focus:text-pink-500 focus:border-pink-500`}
            onClick={() => setPostOption("text")}
          >
            Text
          </button>
          <button
            className={`px-4 py-2 rounded font-bold ${
              postOption === "image" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-700"
            } focus:text-pink-500 focus:border-pink-500`}
            onClick={() => setPostOption("image")}
          >
            Image
          </button>
          <button
            className={`px-4 py-2 rounded font-bold ${
              postOption === "link" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-700"
            } focus:text-pink-500 focus:border-pink-500`}
            onClick={() => setPostOption("link")}
          >
            Link
          </button>
        </div>


        {postOption === "text" && (
          <textarea
            rows="4"
            className="w-full border border-gray-300 p-2 mb-2 rounded"
            placeholder="Write your post content..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        )}
        {postOption === "image" && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
        )}
        {postOption === "link" && (
          <input
            type="text"
            className="w-full border border-gray-300 p-2 mb-2 rounded"
            placeholder="Enter link URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        )}
        {selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mb-2 max-h-40" />
        )}
        <button
          className="hover:text-gray-800/70 text-gray-700 font-bold px-4 py-2 rounded"
          onClick={handlePostSubmit}
        >
          Post
        </button>
        <button
          className="hover:text-gray-800/70 text-gray-700 font-bold px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
