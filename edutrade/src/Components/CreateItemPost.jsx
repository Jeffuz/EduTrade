import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { useSelector } from "react-redux";
import { UserAuth } from "../Context/AuthContext";
import { firestore, firestoreAddDoc, firestoreCollection, firestoreServerTimestamp} from '../Firebase';
import { useNavigate  } from "react-router-dom";

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css'
const CreateItemPost = () => {
  const { user } = UserAuth();
  const imageList = useSelector(state => state.ImageList);

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [desc, setDesc] = useState(null);
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();

  const handleSubmitCreateListing = async (e) => {  
    if (name === null || price === null || desc === null || location === null) {
      alert("Please fill out all forms");
      return;
    }
      


    // Try Uploading listing to the database
    try {
      const listingRef = firestoreCollection(firestore, "product_listings");
      var lowerCase = name.toLowerCase();

      let tags = lowerCase.split(" ");

      await firestoreAddDoc(listingRef, {
        uid: user.uid,
        name: lowerCase,
        price: price,
        description: desc,
        images: imageList,
        tags: tags,
        location: location,
        created: firestoreServerTimestamp()
      });

      navigate(-1);

    } catch (error) {
      console.error("Error Adding Listing", error);
    }

  } 
  function onPlaceSelect(value) {
    if(value === null)
      return;

    setLocation(value.properties.city)
  }

  return (
    <div className="text-center mt-0 m-36 bg-green-50 pl-10 pr-10
    rounded-xl">

      <h3 className="text-4xl m-9">Create New Listing</h3>

      <ImageUploader/>
      
      <div className="text-left text-xl">
        <div className="m-10 flex justify-left flex-wrap">
          <br/><label>Item Name:</label>
          <input type="text" id="name" placeholder="Enter Title" onChange={(e) => setName(e.target.value)} 
          className="bg-white w-fill border-slate-500 border-2 border-solid rounded-lg"/>  
        </div>

        <div className="m-10 flex justify-left flex-wrap">
          <br/><label>Price $:</label>
          <input type="text" id="price" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} 
          className="bg-white border-slate-500 border-2 border-solid g-inherit rounded-lg"/>
        </div>

        <div className="m-10 flex justify-left flex-wrap">
          <label>Location: </label>
          <div className="w-[30%] min-w-[300px]">
            <GeoapifyContext  apiKey="cd43814d5f9e463a87a3b89b2c00db26">
                <GeoapifyGeocoderAutocomplete
                  type="city"
                  placeSelect={onPlaceSelect}
                />
            </GeoapifyContext >             
          </div>
    
        </div>
        <div className="m-10">
          <br/><label>Description:</label><br/>
          <textarea rows="4" cols="70" id="description" placeholder="Describe your item or items" onChange={(e) => setDesc(e.target.value)} 
          className="bg-white border-slate-500 border-2 border-solid g-inherit rounded-lg"/>
        </div>
    
        
        <button onClick={handleSubmitCreateListing}
                className="bg-slate-300 rounded-lg m-3 p-1 hover:brightness-90 active:bg-slate-400" >Create Listing</button>        
      </div>

    </div>
  )
}
export default CreateItemPost;