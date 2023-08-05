import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { useSelector } from "react-redux";
import { UserAuth } from "../Context/AuthContext";
import { firestore, firestoreAddDoc, firestoreCollection, firestoreServerTimestamp} from '../Firebase';
import { useNavigate  } from "react-router-dom";

const CreateItemPost = () => {
  const { user } = UserAuth();
  const imageList = useSelector(state => state.ImageList);

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [desc, setDesc] = useState(null);

  const navigate = useNavigate();

  const handleSubmitCreateListing = async (e) => {  
    // Try Uploading listing to the database
    try {
      const listingRef = firestoreCollection(firestore, "product_listings");
      await firestoreAddDoc(listingRef, {
        uid: user.uid,
        name: name,
        price: price,
        description: desc,
        images: imageList,
        created: firestoreServerTimestamp()
      });
      navigate(-1);

    } catch (error) {
      console.error("Error Adding Listing", error);
    }

  } 
  return (
    <div className="text-center mt-0 m-36 bg-green-50 pl-10 pr-10
    rounded-xl">

      <h3 className="text-4xl m-9">Create New Listing</h3>

      <ImageUploader/>
      
      <div className="text-left text-xl">
        <div className="m-10">
          <br/><label>Item Name:</label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="bg-inherit w-fill border-red-500 border-2 border-solid rounded-lg"/>  
        </div>

        <div className="m-10">
          <br/><label>Price $:</label>
          <input type="text" id="price" onChange={(e) => setPrice(e.target.value)} className="bg-inherit   border-red-500 border-2 border-solid g-inherit rounded-lg"/>
        </div>
        
        <div className="m-10">
          <br/><label>Description:</label><br/>
          <textarea rows="4" cols="50" id="description" onChange={(e) => setDesc(e.target.value)} className="bg-inherit border-red-500 border-2 border-solid g-inherit rounded-lg"/>
        </div>
    
        
        <button onClick={handleSubmitCreateListing}
                className="bg-slate-300 rounded-lg m-3 p-1 hover:brightness-90 active:bg-slate-400" >Create Listing</button>        
      </div>

    </div>
  )
}
export default CreateItemPost;