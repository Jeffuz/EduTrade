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
      <ul className="px-16">
        {posts.map((post) => (
          <li key={post.id} className="p-6 rounded">
            <Link to={`/post/${post.id}`} className="block border-pink-200 hover:border-pink-500 border-2 rounded-md p-4">
              <div className="cursor-pointer">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                {post.content && <p>{post.content}</p>}
                {post.image && <img src={post.image} alt="Post Image" className="max-h-40 mb-2" />}
                {post.link && <a href={post.link}>{post.link}</a>}
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
