import React, { useState, useEffect } from "react";
import { firestore, firestoreCollection, firestoreDoc, firestoreGetDoc } from "../Firebase"; // Adjust the import path as needed
import { useParams, Link } from "react-router-dom";
import Reply from "../Components/Reply"; // Import the Reply component
import ReplyList from "../Components/ReplyList"; // Import the ReplyList component

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
    <div className="min-h-screen h-fit">
      <div className='flex justify-between max-w-[1500px] mx-auto pt-10'>
        <div className="px-4 w-1/5 flex flex-col">
          <Link to="/forum" className="bg-pink-500 mr-20 py-2 px-4 text-white font-bold rounded focus:bg-pink-300">
            Go Back
          </Link>
        </div>

        <div className="w-3/5 h-screen overflow-y-auto">
          <div className="bg-pink rounded shadow-md px-4 border-2 border-pink-500 overflow-y-auto">
            <div className="flex items-center my-2">
              <img src={post.user.photoURL} alt={post.user.name} className="w-6 h-6 rounded-full mr-2" />
              <p className="text-gray-700 font-medium">{post.user.name}</p>
              <p className="text-gray-500 font-small ml-4">
                {new Date(post.timestamp.seconds * 1000).toLocaleString()}
              </p>
            </div>
            {post.title && <h1 className="text-2xl mb-4 font-semibold">{post.title}</h1>}
            {post.content && <p className="mb-2">{post.content}</p>}
            {post.image && <img src={post.image} alt="Post Image" className="max-h-50 px-24 mb-2" />}
            {post.link && (
              <div className="break-words mb-2">
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {post.link}
                </a>
              </div>
            )}

            {/* Include the Reply component to allow users to comment */}
            <Reply postId={postId} />
            
            {/* Include the ReplyList component to display comments */}
            <ReplyList postId={postId} />
          </div>
        </div>
        
        <div className="w-1/5 flex flex-col pl-10"></div>
      </div>
    </div>
  );
}
