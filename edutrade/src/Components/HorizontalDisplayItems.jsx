import React, { useEffect, useState, useRef  } from "react";
import { addItem, clearProductList } from "../Redux/Actions/Actions";

import { useSelector, useDispatch } from "react-redux";
import ItemDisplay from "./ItemDisplay";

import { firestore, firestoreCollection, firestoreLimit, firestoreQuery, firestoreOrderBy, firestoreGetDocs } from '../Firebase';
import { useNavigate } from "react-router";


export default function HorizontalDisplayItems() {
  const ourRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    scrollLeft: 0,
  })
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productList = useSelector(state => state.ProductList);
  useEffect(() => {
    dispatch(clearProductList());

    DisplayLatestListings();
  }, [])

  async function DisplayLatestListings() {
    const productRef = firestoreCollection(firestore, "product_listings");

    const q = firestoreQuery(productRef, firestoreOrderBy("created", "desc"), firestoreLimit(10));

    const querySnapShot = await firestoreGetDocs(q);

    querySnapShot.forEach((doc) => {

      console.log(doc.data());
      let data = doc.data();

      // if(data.uid == user.uid)
      //     return;

      let object = {
          images: data.images,
          name: data.name,
          price: data.price,
          uid: data.uid,
          location: data.location,
          description: data.description,
          documentID: doc.id
      }

      dispatch(addItem(object));
    })
  }

  const handleDragStart = (e) => {
    if(!ourRef.current) return;
    const slider = ourRef.current;
    
    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    mouseCoords.current = {startX, scrollLeft};

    setIsMouseDown(true);

    document.body.style.cursor = "grabbing";
  }
  const handleDragEnd = (e) => {
    setIsMouseDown(false);
    if(!ourRef.current) return;

    document.body.style.cursor = "default";
  }
  const handleDrag = (e) => {
    if(!isMouseDown || !ourRef.current) return;

    e.preventDefault();
    const slider = ourRef.current;
    const x = e.pageX - slider.offsetLeft;
    console.log("Initial " + mouseCoords.current.startX + " X Offset => " + x);
    const walkX = (x - mouseCoords.current.startX) * 1.5;


    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    console.log(slider.scrollLeft);
    //console.log(walkX);

  }
  const handleMouseLeave = () => {
    setIsMouseDown(false);
    document.body.style.cursor = "default";
  }
  return (
    <div className="border-gray-300/20 hover:border-gray-300/80 px-4 py-2 rounded-lg border-4 to-slate-100">
      <div className="flex z-[-1]">
        <div
          ref={ourRef}
          className="flex overflow-x-auto"
          onMouseDown={handleDragStart} 
          onMouseUp={handleDragEnd}
          onMouseMove={handleDrag}
          onMouseLeave={handleMouseLeave}
        >
          {productList.map((item, index) => (
            <div key={index}>
              <ItemDisplay
                image={item.images[0]}
                title={item.name}
                location={item.location}
                price={item.price}
                docID={item.documentID}
              />
            </div>
          ))}
        {/* "More" button directing to another page */}
        <a href="/productlistings" className="h-full bg-red-100 p-2 flex items-center">
          More
        </a>
      </div>
    </div>
    <div className="flex justify-end"></div>
  </div>
  );
  
}