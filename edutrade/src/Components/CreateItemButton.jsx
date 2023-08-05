import React, { useState } from "react";
import CreateItemPost from "./CreateItemPost";

const CreateItemButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    if(isClicked)
      setIsClicked(false);
    else
      setIsClicked(true);
  }
  return(
    <div className="fixed bottom-[5rem] right-[5rem] p-10 bg-red-100
    rounded-full">
      <button onClick={handleClick}>Create Post</button>
      {isClicked? <CreateItemPost/> : null}
      
    </div> 
      
  )
}
export default CreateItemButton;