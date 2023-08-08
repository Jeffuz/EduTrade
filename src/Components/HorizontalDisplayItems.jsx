import React, { useEffect } from "react";
import { addItem, clearProductList } from "../Redux/Actions/Actions";

import { useSelector, useDispatch } from "react-redux";
import ItemDisplay from "./ItemDisplay";

import { firestore, firestoreCollection, firestoreLimit, firestoreQuery, firestoreOrderBy, firestoreGetDocs } from '../Firebase';
import { useNavigate } from "react-router";

import { CiCircleMore } from 'react-icons/ci'
import { Link } from "react-router-dom";

export default function HorizontalDisplayItems() {
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

  const handleClick = () => {
    navigate("/productlistings");
  }

  const handleScroll = (scrollDirection) => {
    const container = document.querySelector('.flex.overflow-x-auto');
    if (container) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const scrollIncrement = 5; // Adjust the scroll increment as needed
      const scrollIntervalTime = 10; // Adjust the interval time (in milliseconds) as needed

      let currentScrollLeft = container.scrollLeft;
      const scrollInterval = setInterval(() => {
        if (scrollDirection === 'right') {
          currentScrollLeft += scrollIncrement;
          if (currentScrollLeft >= maxScrollLeft) {
            clearInterval(scrollInterval);
          }
        } else if (scrollDirection === 'left') {
          currentScrollLeft -= scrollIncrement;
          if (currentScrollLeft <= 0) {
            clearInterval(scrollInterval);
          }
        }
        container.scrollLeft = currentScrollLeft;
      }, scrollIntervalTime);
    }
  };

  return (
    <div className="border-none bg-blue-100 hover:border-gray-300/80 rounded-lg border-4 to-slate-100">
      <div className="flex overflow-x-hidden z-[-1]">
        <div
          className="flex overflow-x-auto py-2"
          onMouseEnter={() => handleScroll('right')}
          onMouseLeave={() => handleScroll('left')}
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

          <Link to="/productlistings" className="text-blue-500 mt-[10%]">
            <CiCircleMore size={30} />
          </Link>

        </div>
      </div>
      <div className="flex justify-end"></div>
    </div>
  );

}