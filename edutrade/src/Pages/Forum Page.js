import React, { useState } from "react";
import Post from '../Components/Post'; 
import PostList from '../Components/PostList'; 

export default function Forum_Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="h-screen bg-white">
         <div className='flex justify-between max-w-[1500px] mx-auto px-4 pt-10'>
            <div className="w-1/5 flex flex-col gap-y-3">
                <button className="py-2 px-4 text-gray-700 font-bold text-left border-4 hover:border-l-pink-500">
                    Home
                </button>
                <button className="bg-blue-200 py-2 px-4 hover:text-gray-800/70 text-gray-700 font-bold text-left">
                    Shopping
                </button>
                <button className="bg-blue-200 py-2 px-4 hover:text-gray-800/70 text-gray-700 font-bold text-left"
                    onClick={openModal}>
                    Post
                </button>
                <Post isOpen={isModalOpen} onClose={closeModal} />
            </div>
            <div className="w-4/5 overflow-y-auto">
                {/* <div className="h-full"><PostList /></div> */}
                <PostList />
            </div> 
         </div>
    </div>
  );
}