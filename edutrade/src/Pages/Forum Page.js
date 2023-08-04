import React, { useState } from "react";
import Post from '../Components/Post'; 

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
            <div className="w-1/4 p-4 border-r border-gray-400 flex flex-col">
                {/* Sidebar content */}
                Sidebar Content
                <div className="flex-grow"></div>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4 overflow-y-auto">
                {/* Main content */}
                Main Content
                <div className="h-full">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={openModal}
                    >
                        Create Post
                    </button>
                    {/* Render the PostList component */}
                    {/* <PostList /> */}
                    {/* <Post isOpen={isModalOpen} onClose={closeModal} /> */}
                    <Post isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </div>
    </div>
  );
}
