import React, { useState } from "react";
import Post from '../Components/Post';
import PostList from '../Components/PostList';
import SideBar from '../Components/SideBar';
import ThreadPage from './Thread Page';
import { UserAuth } from '../Context/AuthContext';

export default function Forum_Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = UserAuth()

  const openModal = () => {
    // Check if the user is logged in before opening the modal
    if (user?.email) {
      setIsModalOpen(true);
    } else {
      // Display a pop-up or message to inform the user to login
      alert("Please login to create a post.");
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen h-fit bg-blue-100">
      <div className='flex justify-between max-w-[1500px] mx-auto px-4 pt-10'>
        <SideBar />
        <div className="w-3/5 h-screen overflow-y-auto">
          <PostList /> {/* Pass the click handler */}
        </div>
        <div className="w-1/5 flex flex-col pl-10">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 py-3 mr-4 ml-16 text-white items-center font-bold rounded"
            onClick={openModal}>
            Post
          </button>
          <Post isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
      <div className="w-full mt-5">
        <ThreadPage /> {/* Pass the selected post content */}
      </div>
    </div>
  );
}
