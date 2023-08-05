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
    <div className="fixed bg-slate-50 p-36 left-[50%] top-[50%] 
    translate-x-[-50%] translate-y-[-50%]">
      <h3>Create New Listing</h3>

      <ImageUploader/>

      <label>Item Name </label>
      <input type="text" id="name" onChange={(e) => setName(e.target.value)}/>
      <br/>

      <label>Price $: </label>
      <input type="text" id="price" onChange={(e) => setPrice(e.target.value)}/>

      <br/>
      <label>Description </label>
      <input type="text" id="description" onChange={(e) => setDesc(e.target.value)}/>
      
      <br/>
      <button onClick={handleSubmitCreateListing}
      className="bg-slate-300 rounded-lg m-3 p-1" >Create Listing</button>
    </div>
  )
}
export default CreateItemPost;