import React, { useEffect } from "react";
import { addItem, clearProductList } from "../Redux/Actions/Actions";

import { useSelector, useDispatch } from "react-redux";
import ItemDisplay from "./ItemDisplay";

import { firestore, firestoreCollection, firestoreLimit, firestoreQuery, firestoreOrderBy, firestoreGetDocs } from '../Firebase';
import { useNavigate } from "react-router";

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

  return (
    <div className="border-red-900 border-4 border-solid
     bg-gradient-to-r from-transparent from-75%  to-slate-100">

      <div className="flex overflow-x-auto z-[-1]">
        {productList.map((item, index) => {
          return(
            <div key={index}>
                <ItemDisplay image={item.images[0]}
                        title={item.name}
                        location={item.location}
                        price={item.price}
                        docID={item.documentID}
                />  
            </div>
          )
        })}
        <button className="h-fill bg-red-100 p-5"onClick={handleClick}>More</button>        
      </div>

    </div>
  )
}