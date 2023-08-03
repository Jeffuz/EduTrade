import React from "react";
import NavBar from "../Components/NavBar";

import ContactButton from "../Components/ContactButton";
import SearchBarComponent from "../Components/SearchBarComponent";

export default function Home_Page() {
    const handleClick = (searchData) => {
        console.log(searchData)
    }

    return (
        <div>
            <NavBar/>

            <div class='bg-[#E9F7CA] p-36'>
                <h3 class='mb-5 text-5xl'>Empowering Learning through Educational Exchange</h3>
                <p class='mb-10 text-2xl text-[#F7D488] brightness-75'>Find what students are selling locally and save</p>
                <SearchBarComponent/>             
            </div>

            <div>
                Contact Us Page
                <ContactButton/>
            </div>
        </div>
    )
}