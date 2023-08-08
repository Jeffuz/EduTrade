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

      // Sort posts from newest to oldest
      postData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

      setPosts(postData);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <ul className="px-16 space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="rounded">
            <Link to={`/post/${post.id}`} className="block p-4 border-2 border-stone-300 hover:border-stone-500 rounded-md">
              <div className="cursor-pointer">
                {/* Display user name and profile photo */}
                <div className="flex items-center mb-2">
                  <img src={post.user.photoURL} alt={post.user.name} className="w-6 h-6 rounded-full mr-2" />
                  <p className="text-gray-700 font-medium">{post.user.name}</p>
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                {post.content && <p>{post.content}</p>}
                {post.image && <img src={post.image} alt="Post Image" className="max-h-40 mb-2" />}
                {post.link && (
                  <div className="cursor-pointer break-words">
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {post.link}
                    </a>
                  </div>
                )}
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
