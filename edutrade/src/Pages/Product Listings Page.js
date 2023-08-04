import React, { useEffect } from "react";
import SearchBarComponent from "../Components/SearchBarComponent";
import ItemDisplay from "../Components/ItemDisplay";
import CreateItemPost from "../Components/CreateItemPost";

export default function Product_Listings_Page() {
    return (
        <div className="bg-[#E9F7CA] text-center">
            <div>
                <CreateItemPost/>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <SearchBarComponent/>
                </div>
                <p className="m-auto flex-1">FILTERS</p>
            </div>
            
            {/* Display */}
            <div className=" flex flex-wrap justify-stretch bg-[#eeee] ml-[5vw] mr-[5vw] min-h-screen h-fit">
                <ItemDisplay 
                    image="/logo192.png"
                    title="Item"
                    location="You Mom House"
                    price="Free"
                />
                <ItemDisplay 
                    image="/logo192.png"
                    title="Desk"
                    location="You Mom House"
                    price="5$"
                />
                <ItemDisplay 
                    image="/logo192.png"
                    title="Chair"
                    location="You Mom House"
                    price="20$"
                />
                <ItemDisplay 
                    image="/logo192.png"
                    title="Book"
                    location="You Mom House"
                    price="Free"
                />
                                <ItemDisplay 
                    image="/logo192.png"
                    title="Item"
                    location="You Mom House"
                    price="Free"
                />
                <ItemDisplay 
                    image="/logo192.png"
                    title="Desk"
                    location="You Mom House"
                    price="5$"
                />
                <ItemDisplay 
                    image="/logo192.png"
                    title="Chair"
                    location="You Mom House"
                    price="20$"
                />
                <ItemDisplay 
                    image="/logo192.png"
                    title="Book"
                    location="You Mom House"
                    price="Free"
                />
            </div>
        </div>
    )
}