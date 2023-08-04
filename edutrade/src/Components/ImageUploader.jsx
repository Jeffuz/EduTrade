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

    setIndex(index + changeValue);
    
  }
  return(
    <div>
      <h3>Upload Image</h3>        
      {!imageList.length ? (null) : (
        <div>
          <button onClick={(e) => setImageIndex(-1)}>Back</button>
          <button onClick={(e) => setImageIndex(1)}>Next</button>
          <img className="max-h-[15vw]" src={imageList[index]}/>    
        </div>
        )}
    

      <input type="file" accept=".png,.jpg" alt=" " onChange={handleUpload}/>
    </div>
  )
}
export default ImageUploader;