import React, { useState, useEffect } from "react";
import { firestore, firestoreCollection, firestoreDoc, firestoreGetDoc } from "../Firebase"; // Adjust the import path as needed
import { useParams, Link } from "react-router-dom";

export default function ThreadPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const docSnapshot = await firestoreGetDoc(firestoreDoc(firestore, `posts/${postId}`));

        if (docSnapshot.exists()) {
          setPost(docSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full p-5">
       <Link to="/forum" className="bg-pink-500 py-2 px-4 text-white font-bold rounded focus:bg-pink-300">
        Go Back
      </Link>
      <div className="bg-white p-4 rounded shadow-md">
        {post.content && <p>{post.content}</p>}
        {post.image && <img src={post.image} alt="Post Image" className="max-h-40 mb-2" />}
        {post.link && (
          <div className="break-words">
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {post.link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}


