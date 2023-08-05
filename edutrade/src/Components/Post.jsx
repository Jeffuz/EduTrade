import React, { useState } from "react";
import { firestore, firestoreCollection, firestoreAddDoc, firestoreServerTimestamp } from '../Firebase';

export default function Post({ isOpen, onClose }) {
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = async () => {
    if (postContent.trim() !== "") {
      try {
        const postRef = firestoreCollection(firestore, "posts");
        await firestoreAddDoc(postRef, {
          content: postContent,
          timestamp: firestoreServerTimestamp(),
        });
        onClose(); // Close the modal after posting
        setPostContent("");
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
    //   onClick={onClose}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-80 rounded">
        <textarea
          rows="4"
          className="w-full border border-gray-300 p-2 mb-4"
          placeholder="Write your post here..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
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
