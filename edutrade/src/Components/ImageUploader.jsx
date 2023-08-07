import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage } from "../Redux/Actions/Actions";
import ImageDisplay from "./ImageDisplay";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const imageList = useSelector(state => state.ImageList);

  const handleUpload = (e) => {;

    const blob = new Blob([e.target.files[0]]);
    const blobUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.src = blobUrl;


    img.onload = function() {
      // have to wait till it's loaded
      var resized = resizeImage(img); // send it to canvas
      dispatch(addImage(resized));
    }
  }
  function resizeImage(img) {
    const canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height;
  
    
    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    
    //preview.appendChild(canvas); // do the actual resized preview
    
    return canvas.toDataURL("image/jpeg",0.2); // get the data from canvas as 70% JPG (can be also PNG, etc.)
  }
  return(
    <div className="">
      <h3>Upload Image</h3>        
        <div>

          <ImageDisplay imageList={imageList}/>

          <label for="imageInput" className="p-5 transition-all duration-100 bg-slate-200 rounded-lg text-[calc(1vw+5px)]
                hover:brightness-75 active:bg-blue-500">
            Upload Image
            <input id="imageInput" type="file" accept=".png,.jpg" alt=" " className="hidden" onChange={handleUpload}/>  
          </label>

        </div>
    

      
    </div>
  )
}
export default ImageUploader;