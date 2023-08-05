import React from "react";
import { Link } from "react-router-dom";
const CreateItemButton = () => {

  return(
    <div className="fixed bottom-[5rem] right-[5rem] p-10 bg-red-100
    rounded-full">
      <Link to="/createlisting" >Create Post</Link>
      
    </div> 
      
  )
}
export default CreateItemButton;