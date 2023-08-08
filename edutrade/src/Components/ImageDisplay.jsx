import React, {useState} from "react";

const ImageDisplay = ({imageList}) => {
  const [index, setIndex] = useState(0);
  const setImageIndex = (changeValue) => {
    if(index === 0 && changeValue === -1)
      return;

    if (index === imageList.length-1 && changeValue === 1)
      return;
    console.log(index);
    setIndex(index + changeValue);
    
  }

  return (
    <div className="flex justify-center">
      {imageList.length > 0? 
        <button class="relative left-[4rem] bg-red-50 p-5 opacity-30 hover:opacity-100 
        transition-all duration-100" 
        onClick={(e) => setImageIndex(-1)}>Back</button> 
      : null}


      <img className=" h-[90%] w-[90%] aspect-square object-cover" src={imageList[index]}/>
      
      {imageList.length > 0? 
        <button className="relative right-[4rem] bg-red-50 p-5 opacity-30 hover:opacity-90 
        transition-all duration-100" 
        onClick={(e) => setImageIndex(1)}>Next</button>    
      : null }      
    </div>
  )
}

export default ImageDisplay;