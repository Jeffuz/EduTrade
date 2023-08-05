import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage } from "../Redux/Actions/Actions";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const imageList = useSelector(state => state.ImageList);

  const [index, setIndex] = useState(0);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    var fReader = new FileReader();
    
    fReader.readAsDataURL(e.target.files[0]);

    console.log(typeof(imageList));
    fReader.onloadend = function(event){
      dispatch(addImage(event.target.result));
    }
  }
  const setImageIndex = (changeValue) => {
    if(index === 0 && changeValue === -1)
      return;

    if (index === imageList.length-1 && changeValue === 1)
      return;
    console.log(index);
    setIndex(index + changeValue);
    
  }
  return(
    <div className="">
      <h3>Upload Image</h3>        
        <div>

          <div className="flex justify-center">
            {imageList.length > 0? 
              <button class="bg-red-50 p-5 opacity-30 hover:opacity-90 
              transition-all duration-100 rounded-l-full" 
              onClick={(e) => setImageIndex(-1)}>Back</button> 
            : null}


            <img className="h-[50%] w-[50%] aspect-square object-cover" src={imageList[index]}/>
            
            {imageList.length > 0? 
              <button class="bg-red-50 p-5 opacity-30 hover:opacity-90 
              transition-all duration-100 rounded-r-full" 
              onClick={(e) => setImageIndex(1)}>Next</button>    
            : null }      
          </div>



          <label for="imageInput" className="p-5 transition-all duration-100 bg-slate-200 rounded-lg text-2xl
                hover:brightness-75 active:bg-blue-500">
            Upload Image
            <input id="imageInput" type="file" accept=".png,.jpg" alt=" " className="hidden" onChange={handleUpload}/>  
          </label>

        </div>
    

      
    </div>
  )
}
export default ImageUploader;