import React, { useState } from "react";
import { set } from "../Redux/Actions/Actions";

import { useDispatch } from "react-redux";



const SearchBarComponent = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState(null);
  const [location, setLocation] = useState(null);

  const handleClick = () => {
    dispatch(set(search, location));
  }

  return(
    <div>
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="What you are looking for"/>
        {/* Auto Complete City names when searching */}
        <input type="text" onChange={(e) => setLocation(e.target.value)} placeholder="Location"/>
        <button onClick={handleClick}>Search</button>
    </div>    
  )

}
export default SearchBarComponent;