import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { set } from "../Redux/Actions/Actions";

import { useDispatch } from "react-redux";
import { clearProductList } from "../Redux/Actions/Actions";

import { useLocation } from 'react-router-dom';

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css'


const SearchBarComponent = () => {
  const paramLocation = useLocation();
  const searchParams = new URLSearchParams(paramLocation.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (searchParams.get('params') === null)
      return;
    if (searchParams.get('location') === null)
      return;

    dispatch(set(searchParams.get('params').toLowerCase(), searchParams.get('location')));
  }, [])
  const handleClick = async () => {
    let lowerCase = null;

    if (search !== null)
      lowerCase = search.toLowerCase();

    dispatch(clearProductList());
    dispatch(set(lowerCase, location));
    //navigate();
    navigate(`/productlistings?params=${lowerCase}&location=${location}`);
    navigate(0);
  }
  function onPlaceSelect(value) {
    if (value === null)
      return;

    setLocation(value.properties.city)
  }

  return (
    <div class='flex py-4 justify-start flex-wrap mt-12'>
      <input 
        className='w-1/3 h-[36px] 
        pt-0 mr-5 rounded-md
        pl-[7px] pr-[31px] pb-0 text-[14px]
        border-solid border-1 border-black border-opacity-[0.2] 
        focus:outline-0'
        
        type="text" onChange={(e) => setSearch(e.target.value)}
        placeholder="What you are looking for"
      />
      {/* Auto Complete City names when searching */}
      {/* <input class='pt-2 pb-2 pr-10 rounded-lg' type="text" onChange={(e) => setLocation(e.target.value)} placeholder="Location"/> */}
      <div className="w-1/3">
        <GeoapifyContext apiKey="cd43814d5f9e463a87a3b89b2c00db26">
          <GeoapifyGeocoderAutocomplete
            value={searchParams.get('location')}
            placeSelect={onPlaceSelect}
          />
        </GeoapifyContext >
      </div>
      <button
        className='rounded-md w-1/12 py-2 bg-orange-400 hover:bg-orange-300 duration-300 ease-in-out shadow-lg font-semibold text-gray-900'
        onClick={handleClick}>
        Search
      </button>
    </div>
  )

}
export default SearchBarComponent;