import React, { useState } from "react";
import { useNavigate } from "react-router";
import { set } from "../Redux/Actions/Actions";

import { useDispatch } from "react-redux";
import { clearProductList } from "../Redux/Actions/Actions";


import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import FindAddress from "../AddressAPI";


const SearchBarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(null);
  const [location, setLocation] = useState(null);

  const handleClick = async() => {
    if(search === null)
      return;
    let lowerCase = search.toLowerCase();

    await FindAddress(location);
    dispatch(clearProductList());
    dispatch(set(lowerCase, location));
    //navigate(`/productlistings?params=${lowerCase}&location=${location}`);
  }
  function onPlaceSelect(value) {
    console.log(value.properties.city);
    setLocation(value.properties.city)
  }

  return(
    <div class='p-10'>
        <input class='pt-2 pb-2 pr-20 mr-5 rounded-lg' type="text" onChange={(e) => setSearch(e.target.value)} placeholder="What you are looking for"/>
        {/* Auto Complete City names when searching */}
        {/* <input class='pt-2 pb-2 pr-10 rounded-lg' type="text" onChange={(e) => setLocation(e.target.value)} placeholder="Location"/> */}
        <GeoapifyContext  apiKey="cd43814d5f9e463a87a3b89b2c00db26">
          <GeoapifyGeocoderAutocomplete
            placeSelect={onPlaceSelect}
          />
        </GeoapifyContext >

        <button class='rounded-3xl p-2  ml-5 pl-5 pr-5 bg-[#F7D488]' onClick={handleClick}>Search</button>
    </div>    
  )

}
export default SearchBarComponent;