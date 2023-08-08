import React, { useState } from "react";
import { UserAuth } from '../Context/AuthContext'; // Make sure to adjust the import path
import {
  firestore,
  firestoreAddDoc,
  firestoreServerTimestamp,
  firestoreCollection,
} from "../Firebase"; // Adjust the import path as needed

export default function Reply({ postId }) {
  const [comment, setComment] = useState("");
  const { user } = UserAuth();

  const handleCommentSubmit = async () => {
    if (!user?.email) {
      // Prompt user to login
      alert("Please log in to comment.");
      return;
    }

    try {
      // Store the comment to Firestore and link it to the current post
      await firestoreAddDoc(firestoreCollection(firestore, `posts/${postId}/comments`), {
        text: comment,
        username: user.displayName, // Use the user's display name as username
        photoURL: user.photoURL, // Use the user's photoURL as photoURL
        timestamp: firestoreServerTimestamp(),
      });

      // Clear the comment input
      setComment("");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        rows="4"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded resize-none"
      />
      <button
        onClick={handleCommentSubmit}
        className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 mb-2 rounded float-right"
      >
        Comment
      </button>
    </div>
  );
}
