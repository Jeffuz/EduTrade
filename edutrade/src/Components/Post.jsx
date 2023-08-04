import React, { useState } from "react";
import { firestore, firestoreCollection, firestoreAddDoc, firestoreServerTimestamp } from '../Firebase';

export default function Post() {
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = async () => {
    if (postContent.trim() !== "") {
      try {
        const postRef = firestoreCollection(firestore, "posts");
        await firestoreAddDoc(postRef, {
          content: postContent,
          timestamp: firestoreServerTimestamp(),
        });
        setPostContent("");
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <div>
      <textarea
        rows="4"
        placeholder="Write your post here..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
}
