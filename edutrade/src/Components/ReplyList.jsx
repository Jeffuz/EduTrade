import React, { useState, useEffect } from "react";
import {
  firestore,
  firestoreCollection,
  firestoreOrderBy,
  firestoreQuery,
  firestoreGetDocs,
} from "../Firebase"; // Adjust the import path as needed
import Reply from "./Reply"; // Make sure to adjust the import path

export default function ReplyList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await firestoreGetDocs(firestoreQuery(firestoreCollection(firestore, `posts/${postId}/comments`), firestoreOrderBy("timestamp", "asc")));

        const fetchedComments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleReplyClick = (commentId) => {
    // Implement your logic to open a reply form or component here
    console.log(`Reply to comment with ID: ${commentId}`);
  };

  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded p-2 mb-2">
          <p>{comment.text}</p>
          <button onClick={() => handleReplyClick(comment.id)}>Reply</button>
        </div>
      ))}
    </div>
  );
}
