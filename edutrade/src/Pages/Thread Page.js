//  individual discussions (threads)
import React, { useState, useEffect } from "react";
import { firestore, firestoreGetDocs, firestoreCollection } from "../Firebase"; // Adjust imports as needed

export default function PostDetails({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const docSnapshot = await firestoreGetDocs(
          firestoreCollection(firestore, "posts", postId)
        );

        if (docSnapshot.exists()) {
          setPost(docSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }

    fetchPostDetails();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Post Details</h2>
      <p>{post.content}</p>
      <p>{new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
    </div>
  );
}
