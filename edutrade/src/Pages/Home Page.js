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
            <SearchBarComponent/>
            
            <h3>Empowering Learning through Educational Exchange</h3>
            <p>Find what students are selling locally and save</p>
            <div>
                Contact Us Page
                <ContactButton/>
            </div>
        </div>
    )
}