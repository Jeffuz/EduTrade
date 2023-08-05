import React, { useState } from "react";
import Post from '../Components/Post'; 
import PostList from '../Components/PostList'; 
import SideBar from '../Components/SideBar'; 
import { Icon } from '@iconify/react';

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
            <SideBar />
            <div className="w-3/5 h-[1200px] overflow-y-auto">
                {/* <div className="h-full"><PostList /></div> */}
                <PostList />
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
    </div>
  );
}
