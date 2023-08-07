import React, { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import { useSelector, useDispatch } from "react-redux";
import { UserAuth } from "../Context/AuthContext";
import { firestore, firestoreAddDoc, firestoreCollection, firestoreServerTimestamp} from '../Firebase';
import { useNavigate  } from "react-router-dom";
import { clearImages } from "../Redux/Actions/Actions";

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css'

const CreateItemPost = () => {
  const dispatch = useDispatch();

  const { user } = UserAuth();
  const imageList = useSelector(state => state.ImageList);

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [desc, setDesc] = useState(null);
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    
    if(!user?.email)
      navigate("/login");
    else
      console.log("Already logged in");

    dispatch(clearImages());
  }, [user]);


  const handleSubmitCreateListing = async (e) => {  
    if (name === null || price === null || desc === null || location === null) {
      alert("Please fill out all forms");
      return;
    }
    const checkPriceString = /^[0-9]*[.]?^[0-9]*$/;


    // Try Uploading listing to the database
    try {
      const listingRef = firestoreCollection(firestore, "product_listings");
      var lowerCase = name.toLowerCase();

      let tags = lowerCase.split(" ");
      if(!price.match(checkPriceString))
        {
          alert("Price is not num");  
          return;
        }
      console.log("Uploading");

      await firestoreAddDoc(listingRef, {
        uid: user.uid,
        name: lowerCase,
        price: price,
        description: desc,
        images: imageList,
        tags: tags,
        location: location,
        displayName: user.displayName, 
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
      <div className="flex">
        <div className="text-xl flex-[6_1_0%]">

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
          <div className="m-10 text-left">
            <br/><label>Description:</label><br/>

            <textarea id="description" row="20" cols="30" placeholder="Describe your item or items" onChange={(e) => setDesc(e.target.value)} 
            className="bg-white border-slate-500 border-2 border-solid g-inherit rounded-lg"/>
            
          </div>
      
          <button onClick={handleSubmitCreateListing}
                  className="bg-slate-300 rounded-lg m-3 p-1 hover:brightness-90 active:bg-slate-400" >Create Listing</button>        
        </div> 

        <div className="flex-[1_1_30%]">
          <ImageUploader/>        
        </div>

      </div>




    </div>
  )
}
export default CreateItemPost;