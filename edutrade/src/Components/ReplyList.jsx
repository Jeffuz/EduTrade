import React, { useState, useEffect } from "react";
import {
  firestore,
  firestoreCollection,
  firestoreOrderBy,
  firestoreQuery,
  firestoreGetDocs,
  firestoreDoc,
  firestoreGetDoc,
} from "../Firebase"; // Adjust the import path as needed
import { UserAuth } from "../Context/AuthContext"; // Adjust the import path

import Reply from "./Reply"; // Make sure to adjust the import path

export default function ReplyList({ postId }) {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const { user: currentUser } = UserAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await firestoreGetDocs(firestoreQuery(firestoreCollection(firestore, `posts/${postId}/comments`), firestoreOrderBy("timestamp", "asc")));

        const fetchedComments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
        
        // Fetch user profiles based on authentication user data
        const userIds = fetchedComments.map((comment) => comment.userId);
        const usersData = {};
        for (const userId of userIds) {
          // Assuming that 'userId' is the same as the authentication user UID
          if (userId === currentUser?.uid) {
            usersData[userId] = currentUser;
          } else {
            // Handle fetching user profiles from authentication or other sources
            // and store in 'usersData'
          }
        }
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, currentUser]);

  const handleReplyClick = (commentId) => {
    // open a reply form or component here
    console.log(`Reply to comment with ID: ${commentId}`);
  };

  return (
    <div className="mt-12">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded p-2 mb-2">
          <div className="flex items-center mb-2">
            <img src={users[comment.userId]?.photoURL} alt={users[comment.userId]?.displayName} className="w-6 h-6 rounded-full mr-2" />
            <p className="text-gray-700 font-medium">{users[comment.userId]?.displayName}</p>
          </div>
          <p>{comment.text}</p>
          <button onClick={() => handleReplyClick(comment.id)}>Reply</button>
        </div>
      ))}
    </div>
  );
}
