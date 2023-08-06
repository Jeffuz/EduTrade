import React from "react";
import SearchBarComponent from "../Components/SearchBarComponent";
import { Link } from 'react-router-dom'

export default function Home_Page() {

    return (
        <div>
            <div class='bg-[#E9F7CA] p-36 h-[47.95rem]'>
                <h3 class='mb-5 text-5xl'>Empowering Learning through Educational Exchange</h3>
                <p class='mb-10 text-2xl text-[#F7D488] brightness-75'>Find what students are selling locally and save</p>
                <SearchBarComponent />
                <Link to="/forum" className='bg-white text-black hover:bg-gray-50 duration-300 ease-in-out shadow-lg w-[200px] rounded-md font-medium my-6 px-6 py-3'
                >Go to Forum</Link>
            </div>
        </div>

    )
}