import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { useSelector } from "react-redux";
import { UserAuth } from "../Context/AuthContext";
import { firestore, firestoreAddDoc, firestoreCollection, firestoreServerTimestamp} from '../Firebase';

const CreateItemPost = () => {
  const { user } = UserAuth();
  const imageList = useSelector(state => state.ImageList);

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [desc, setDesc] = useState(null);


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
        <br/><label>Item Name </label><br/>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)}/>
        

        <br/><label>Price $: </label><br/>
        <input type="text" id="price" onChange={(e) => setPrice(e.target.value)}/>
        
        
        <br/><label>Description </label><br/>
        <input type="text" id="description" onChange={(e) => setDesc(e.target.value)}/>
        
        
        <button onClick={handleSubmitCreateListing}
        className="bg-slate-300 rounded-lg m-3 p-1" >Create Listing</button>        
      </div>

    </div>
  )
}
export default CreateItemPost;