import React, { useState } from "react";
import Post from '../Components/Post';
import PostList from '../Components/PostList';
import SideBar from '../Components/SideBar';
import ThreadPage from './Thread Page';

export default function Forum_Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen h-fit bg-white">
      <div className='flex justify-between max-w-[1500px] mx-auto px-4 pt-10'>
        <SideBar />
        <div className="w-3/5 h-screen overflow-y-auto">
          <PostList /> {/* Pass the click handler */}
        </div>
        <div className="w-1/5 flex flex-col pl-10">
          <button
            className="bg-pink-500 py-3 mr-4 ml-16 text-gray-200 items-center font-bold rounded focus:bg-pink-300"
            onClick={openModal}>
            post
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
