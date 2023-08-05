import React from "react";

const ItemDisplay = ({image, title, location, price}) => {
  return(
    <div className="p-2 text-left min-h-[15vw] min-w-[15vw] flex-auto">
      <img src={image} alt="Item Image" 
      className="rounded-lg object-cover h-[20rem] w-[20rem]
      border-2 border-solid border-slate-900 "/>

      <p className="text-2xl ">{price}</p>
      <h3 className="text-2xl">{title}</h3>
      <p className="text-md text-slate-500">{location}</p>
      

    </div>
  )
}

export default ItemDisplay