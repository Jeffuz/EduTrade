import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage } from "../Redux/Actions/Actions";
import ImageDisplay from "./ImageDisplay";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const imageList = useSelector(state => state.ImageList);


  const handleUpload = (e) => {;
    var fReader = new FileReader();
    
    fReader.readAsDataURL(e.target.files[0]);

    fReader.onloadend = function(event){
      dispatch(addImage(event.target.result));
    }
  }

  return(
    <div className="">
      <h3>Upload Image</h3>        
        <div>

          <ImageDisplay imageList={imageList}/>

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