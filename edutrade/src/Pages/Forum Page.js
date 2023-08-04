import React from "react";
import Post from '../Components/Post'; 
// import PostList from '../Components/PostList'; 

export default function Forum_Page() {
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
                        {/* Render the Post component */}
                        <Post />

                        {/* Render the PostList component */}
                        {/* <PostList /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}