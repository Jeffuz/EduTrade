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
    <div className="h-screen flex flex-col px-4">
        <hr className="h-px border-0 dark:bg-gray-400"></hr>
        <div className="flex flex-1">
            {/* Sidebar */}
            <div className="w-1/5 py-8 border-r border-gray-400 flex-col">
                {/* Sidebar content */}
                <div className="flex flex-col gap-y-3 pr-4 justify-end"> {/* Add justify-end here */}
                    <div className="flex justify-end"> {/* Use flex and justify-end for individual buttons */}
                        <button className="w-48 py-2 px-4 hover:text-gray-600 text-gray-500 font-bold text-left">
                            Home
                        </button>
                    </div>
                    <div className="flex justify-end"> {/* Use flex and justify-end for individual buttons */}
                        <button className="w-48 py-2 px-4 hover:text-gray-600 text-gray-500 font-bold text-left">
                            Shopping
                        </button>
                    </div>
                    <div className="flex justify-end"> {/* Use flex and justify-end for individual buttons */}
                        <button 
                            className="w-48 py-2 px-4 hover:text-gray-600 text-gray-500 font-bold text-left"
                            onClick={openModal}
                        >
                            Post
                        </button>
                        <Post isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="w-4/5 p-4 overflow-y-auto">
                {/* Main content */}
                <div className="h-full">
                    {/* Render the PostList component */}
                    <PostList />
                </div>
            </div>
        </div>
    </div>
  );
}
