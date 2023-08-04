import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { firestore, firestoreCollection, firestoreGetDocs } from '../Firebase';

function PostList() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      async function fetchPosts() {
        const querySnapshot = await firestoreGetDocs(firestoreCollection(firestore, "posts"));
  
        const postData = [];
        querySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
  
        setPosts(postData);
      }
  
      fetchPosts();
    }, []);
  
    return (
      <div>
            <ul className="space-y-4 px-28 max-w-7xl">
                {posts.map((post) => (
                <li key={post.id} className="w-2/3 bg-gray-200 p-6 rounded">
                    <Link to={`/post/${post.id}`} className="block">
                    <div className="cursor-pointer">
                        <p>{post.content}</p>
                        <p className="text-gray-500 text-sm">
                        {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                        </p>
                    </div>
                    </Link>
                </li>
                ))}
            </ul>
      </div>
    );
  }
  
  export default PostList;
  
