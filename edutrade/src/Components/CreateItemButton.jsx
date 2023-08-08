import React from "react";
import { Link } from "react-router-dom";
const CreateItemButton = () => {

  return(
    <div className="fixed bottom-[5rem] right-[5rem] px-4 py-2 rounded-full bg-stone-300 font-semibold text-gray-900">
      <Link to="/createlisting" >Create Post</Link>
      
    </div> 
      
  )
}
export default CreateItemButton;