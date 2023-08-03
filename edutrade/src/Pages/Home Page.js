import React from "react";

import SignupButtonComponent from "../Components/SignupButtonComponent";
import SearchBarComponent from "../Components/SearchBarComponent";

export default function Home_Page() {
    const handleClick = (searchData) => {
        console.log(searchData)
    }

    return (
        <div>
            Home Page
            <SignupButtonComponent/>
            <SearchBarComponent/>
        </div>
    )
}