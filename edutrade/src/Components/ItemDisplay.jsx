import React from "react";

const ItemDisplay = ({image, title, location, price}) => {
  return(
    <div className="p-2 text-left w-fit h-fit">
      <img src={image} alt="Item Image" className="rounded-lg object-cover 
      border-2 border-solid border-slate-900 
      min-h-[5rem] min-w-[5rem]"/>

      <p className="text-2xl ">{price}</p>
      <h3 className="text-2xl">{title}</h3>
      <p className="text-md text-slate-500">{location}</p>
      

    </div>
  )
}

export default ItemDisplay