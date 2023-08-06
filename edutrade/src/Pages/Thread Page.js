import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore, firestoreCollection, firestoreGetDocs } from "../Firebase";
import PostDetails from "../Components/PostDetails"; // Import the PostDetails component

export default function ThreadPage() {
  const { postId } = useParams(); // Get the postId from the URL
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const querySnapshot = await firestoreGetDocs(
          firestoreCollection(firestore, "posts")
        );

        const postData = [];
        querySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });

        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    const selected = posts.find((post) => post.id === postId);
    setSelectedPost(selected);
  };

  return (
    <div className="thread-page">
      <div className="post-list">
        <h2>Post List</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id} onClick={() => handlePostClick(post.id)}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="post-details">
        {selectedPost ? (
          <PostDetails postId={selectedPost.id} />
        ) : (
          <p>Select a post to view its details</p>
        )}
      </div>
    </div>
  );
}
