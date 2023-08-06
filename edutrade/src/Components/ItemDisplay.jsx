import React from "react";
import { useNavigate } from "react-router-dom";

const ItemDisplay = ({image, title, location, price, docID}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {

    navigate(`/productdetails?${docID}`);
  }
  return(
    <div onClick={handleClick} className="p-2 text-left min-h-[15vw] min-w-[15vw] 
    max-h-fit max-w-[20rem] flex-auto">
      <img src={image} alt="Item Image" 
      className="rounded-lg object-cover h-[20rem] w-[20rem]
      border-2 border-solid border-slate-900 "/>

      <p className="text-2xl ">${price}</p>
      <h3 className="text-2xl">{title}</h3>
      <p className="text-md text-slate-500">{location}</p>
      

    </div>
  )
}

export default ItemDisplay