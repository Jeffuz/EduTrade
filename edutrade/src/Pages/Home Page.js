import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarComponent from "../Components/SearchBarComponent";
import HorizontalDisplayItems from "../Components/HorizontalDisplayItems";
import { UserAuth } from '../Context/AuthContext';

export default function Home_Page() {
    const backgroundImageUrl = 'https://images.pexels.com/photos/8423900/pexels-photo-8423900.jpeg';
    const { user } = UserAuth();
    return (
        // <div className='p-36 min-h-screen h-fit bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        <div className='p-36 min-h-screen h-fit bg-cover bg-center bg-blue-100'>
            <div className="flex flex-col justify-center max-w-[1500px] mx-auto px-4 pt-10">
                <h3 className='mb-5 text-6xl font-semibold text-blue-600'>Empowering Learning through <br />Educational Exchange</h3>
                <p className='mb-10 text-2xl font-semibold text-blue-900'>Find what students are selling locally and save.</p>
                <SearchBarComponent />
                <Link to="/productlistings"
                    className='bg-indigo-600 hover:bg-indigo-700  duration-300 ease-in-out shadow-lg w-1/6 rounded-md font-semibold text-white my-12 py-3 text-center'
                >
                    Go to Product Listings
                </Link>
                <h1 className='text-blue-500 font-bold'>Featured 🔥</h1>
                <HorizontalDisplayItems />
            </div>
        </div>
    );
}

