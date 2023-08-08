import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";


const ImageDisplay = ({ imageList }) => {
  const [index, setIndex] = useState(0);
  const setImageIndex = (changeValue) => {
    if (index === 0 && changeValue === -1)
      return;

    if (index === imageList.length - 1 && changeValue === 1)
      return;
    console.log(index);
    setIndex(index + changeValue);

  }

  return (
    <div className="flex items-center justify-center">
      {imageList.length > 0 && index > 0 && (
        <button
          className="bg-green-100 rounded-full p-2 hover:bg-green-50 transition-all duration-100 transform translate-x-[-1rem]"
          onClick={() => setImageIndex(-1)}
        >
          <AiOutlineArrowLeft />
        </button>
      )}

      <img
        className="h-[90%] w-[90%] aspect-square object-cover"
        src={imageList[index]}
        alt={`Image ${index + 1}`}
      />

      {imageList.length > 0 && index < imageList.length - 1 && (
        <button
          className="bg-green-100 rounded-full p-2 hover:bg-green-50 transition-all duration-100 transform translate-x-[1rem]"
          onClick={() => setImageIndex(1)}
        >
          <AiOutlineArrowRight />
        </button>
      )}
    </div>
  );
};

export default ImageDisplay;