import React from "react";
import { Link } from "react-router-dom";
const CreateItemButton = () => {

  return (
    <div className="fixed bottom-[7.5rem] right-[5rem] px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 font-semibold text-white">
      <Link to="/createlisting" >Create Post</Link>

    </div>

  )
}
export default CreateItemButton;