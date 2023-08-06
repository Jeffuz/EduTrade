import React, { useState, useEffect } from "react";
import { firestore, firestoreGetDoc, firestoreCollection } from "../Firebase"; // Adjust imports as needed

export default function PostDetails({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const postDocRef = firestoreCollection(firestore, "posts").doc(postId);
        const docSnapshot = await firestoreGetDoc(postDocRef);

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
    <div className="post-details">
      <h2>Post Details</h2>
      <p>{post.content}</p>
      <p>{new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
      {post.image && <img src={post.image} alt="Post" />}
      {post.link && <a href={post.link}>{post.link}</a>}
    </div>
  );
}
