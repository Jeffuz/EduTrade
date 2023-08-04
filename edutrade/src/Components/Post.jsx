// import React, { useState } from "react";
// import { firestore, firestoreCollection, firestoreAddDoc, firestoreServerTimestamp } from '../Firebase';

// export default function Post() {
//   const [postContent, setPostContent] = useState("");

//   const handlePostSubmit = async () => {
//     if (postContent.trim() !== "") {
//       try {
//         const postRef = firestoreCollection(firestore, "posts");
//         await firestoreAddDoc(postRef, {
//           content: postContent,
//           timestamp: firestoreServerTimestamp(),
//         });
//         setPostContent("");
//       } catch (error) {
//         console.error("Error adding post:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <textarea
//         rows="4"
//         placeholder="Write your post here..."
//         value={postContent}
//         onChange={(e) => setPostContent(e.target.value)}
//       ></textarea>
//       <button onClick={handlePostSubmit}>Post</button>
//     </div>
//   );
// }
import React, { useState } from "react";
import { firestore, firestoreCollection, firestoreAddDoc, firestoreServerTimestamp } from '../Firebase';

export default function Post({ isOpen, onClose }) {
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
        onClose(); // Close the modal after posting
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
    //   onClick={onClose}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-80">
        <textarea
          rows="4"
          className="w-full border border-gray-300 p-2 mb-4"
          placeholder="Write your post here..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handlePostSubmit}
        >
          Post
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
