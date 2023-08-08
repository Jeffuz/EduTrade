import React from "react";
import { Icon } from '@iconify/react';
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function SideBar() {
    const location = useLocation();
    const isForumActive = location.pathname === '/forum';
    return (
        <div className="w-1/5 flex flex-col gap-y-3 min-h-screen h-fit"> {/* Add justify-end here */}
            <Link to='/'>
                <button className="relative py-2 px-5 flex items-center text-blue-700 font-bold text-left bg-transparent group focus:text-blue-500">
                    <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transition-all duration-300 transform scale-x-0 group-focus:scale-x-100"></span>
                    <Icon icon="ci:house-01" width="18" className="mr-2" />
                    <span>
                        Home
                    </span>
                </button>
            </Link>

            <NavLink to='/forum' activeClassName="button-active">
                <button className={`relative py-2 px-5 flex items-center text-blue-700 font-bold text-left bg-transparent group focus:text-blue-500 ${isForumActive ? 'button-active' : ''}`}>
                    <span className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${isForumActive ? 'bg-blue-500 transform scale-x-100' : 'bg-gray-700 transform scale-x-0'}`}></span>
                    <Icon icon="mdi:compass-outline" width="18" className={`mr-2 ${isForumActive ? 'text-blue-500' : 'text-blue-700'}`} />
                    <span className={`${isForumActive ? 'text-blue-500' : 'text-blue-700'}`}>Explore Topics</span>
                </button>
            </NavLink>


            <button className="relative py-2 px-5 flex items-center text-blue-700 font-bold text-left bg-transparent group focus:text-blue-500">
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transition-all duration-300 transform scale-x-0 group-focus:scale-x-100"></span>
                <Icon icon="la:question" width="18" className="mr-2" />
                <span>My Topics</span>
            </button>
            <button className="relative py-2 px-5 flex items-center text-blue-700 font-bold text-left bg-transparent group focus:text-blue-500">
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transition-all duration-300 transform scale-x-0 group-focus:scale-x-100"></span>
                <Icon icon="uil:chat" width="18" className="mr-2" />
                <span>My Posts</span>
            </button>

            <Link className="bg-indigo-600 hover:bg-indigo-700 py-3 ml-5 mr-16 mt-10 text-white text-center font-bold rounded focus:bg-pink-300" to='/productlistings'>
                Go to Store
            </Link>

        </div>
    );
}