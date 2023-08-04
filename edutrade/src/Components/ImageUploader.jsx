import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage } from "../Redux/Actions/Actions";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const imageList = useSelector(state => state.ImageList);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    var fReader = new FileReader();
    fReader.readAsDataURL(e.target.files[0]);

    
    fReader.onloadend = function(event){
      dispatch(addImage(event.target.result));
    }

    
  }
  return(
    <div>
      <h3>Upload Image</h3>
      <div className="flex flex-wrap justify-center">
        {imageList.map((value) => {
          return(
            <img className="max-h-[30vw]" src={value}/>
          )
        })}        
      </div>

      <input type="file" accept=".png,.jpg" alt=" " onChange={handleUpload}/>
    </div>
  )
}
export default ImageUploader;