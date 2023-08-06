import React, { useState } from "react";
import { useNavigate } from "react-router";
import { set } from "../Redux/Actions/Actions";

import { useDispatch } from "react-redux";



const SearchBarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(null);
  const [location, setLocation] = useState(null);

  const handleClick = () => {
    
    dispatch(set(search, location));
    navigate("/productlistings", {state:{searchString: search, locationString: location} });
  }

  return(
    <div class='p-10'>
        <input class='pt-2 pb-2 pr-20 mr-5 rounded-lg' type="text" onChange={(e) => setSearch(e.target.value)} placeholder="What you are looking for"/>
        {/* Auto Complete City names when searching */}
        <input class='pt-2 pb-2 pr-10 rounded-lg' type="text" onChange={(e) => setLocation(e.target.value)} placeholder="Location"/>
        <button class='rounded-3xl p-2  ml-5 pl-5 pr-5 bg-[#F7D488]' onClick={handleClick}>Search</button>
    </div>    
  )

}
export default SearchBarComponent;