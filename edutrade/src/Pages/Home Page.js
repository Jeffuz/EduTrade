// import React from "react";
// import SearchBarComponent from "../Components/SearchBarComponent";
// import { Link } from 'react-router-dom'
// import HorizontalDisplayItems from "../Components/HorizontalDisplayItems";

// export default function Home_Page() {

//     return (
//         <div class='bg-[#E9F7CA] p-36 h-fit'>
//             <div >
//                 <h3 class='mb-5 text-5xl'>Empowering Learning through Educational Exchange</h3>
//                 <p class='mb-10 text-2xl text-[#F7D488] brightness-75'>Find what students are selling locally and save</p>
//                 <SearchBarComponent />
//                 <Link to="/forum" className='bg-white text-black hover:bg-gray-50 duration-300 ease-in-out shadow-lg w-[200px] rounded-md font-medium my-6 px-6 py-3'
//                 >Go to Forum</Link>

//             </div>

//             <HorizontalDisplayItems/>
//         </div>

//     )
// }
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarComponent from "../Components/SearchBarComponent";
import HorizontalDisplayItems from "../Components/HorizontalDisplayItems";
export default function Home_Page() {
    const backgroundImageUrl = 'https://images.pexels.com/photos/6146823/pexels-photo-6146823.jpeg';

    return (
        <div className='p-36 min-h-screen h-fit bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className="flex flex-col justify-center max-w-[1500px] mx-auto px-4 pt-10">
                <h3 className='mb-5 text-6xl font-semibold text-gray-800'>Empowering Learning through <br />Educational Exchange</h3>
                <p className='mb-10 text-2xl text-zinc-900'>Find what students are selling locally and save.</p>
                <SearchBarComponent />
                <Link to="/forum"
                    className='bg-gray-700 hover:bg-gray-600 duration-300 ease-in-out shadow-lg w-1/6 rounded-md font-semibold text-white my-12 py-3 text-center'
                >
                    Go to Forum
                </Link>
                <HorizontalDisplayItems/>
            </div>
        </div>
    );
}

