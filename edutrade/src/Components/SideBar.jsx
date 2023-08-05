import React, { useState } from "react";
import { Icon } from '@iconify/react';

export default function SideBar() {
  return (
    <div className="w-1/5 flex flex-col gap-y-3  h-[1100px]"> {/* Add justify-end here */}
        <button className="relative py-2 px-5 flex items-center text-gray-700 font-bold text-left bg-transparent group focus:text-pink-500">
            <span className="absolute left-0 top-0 h-full w-1 bg-pink-500 transition-all duration-300 transform scale-x-0 group-focus:scale-x-100"></span>
            <Icon icon="ci:house-01" width="18" className="mr-2" />
            <span>Home</span>
        </button>
        <button className="relative py-2 px-5 flex items-center text-gray-700 font-bold text-left bg-transparent group focus:text-pink-500">
            <span className="absolute left-0 top-0 h-full w-1 bg-pink-500 transition-all duration-300 transform scale-x-0 group-focus:scale-x-100"></span>
            <Icon icon="mdi:compass-outline" width="18" className="mr-2" />
            <span>Explore Topics</span>
        </button>
        <button className="relative py-2 px-5 flex items-center text-gray-700 font-bold text-left bg-transparent group focus:text-pink-500">
            <span className="absolute left-0 top-0 h-full w-1 bg-pink-500 transition-all duration-300 transform scale-x-0 group-focus:scale-x-100"></span>
            <Icon icon="la:question" width="18" className="mr-2" />
            <span>My Topics</span>
        </button>
        <button className="relative py-2 px-5 flex items-center text-gray-700 font-bold text-left bg-transparent group focus:text-pink-500">
            <span className="absolute left-0 top-0 h-full w-1 bg-pink-500 transition-all duration-300 transform scale-x-0 group-focus:scale-x-100"></span>
            <Icon icon="uil:chat" width="18" className="mr-2" />
            <span>My Posts</span>
        </button>
        <button className="bg-pink-500 py-3 ml-5 mr-16 mt-10 text-gray-200 items-center font-bold rounded focus:bg-pink-300" >
            Go to Store
        </button>

    </div>
  );
}