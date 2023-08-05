import React, { useEffect } from "react";
import SearchBarComponent from "../Components/SearchBarComponent";
import ItemDisplay from "../Components/ItemDisplay";
import CreateItemPost from "../Components/CreateItemPost";

import { useSelector, useDispatch } from "react-redux";
import { addItem, clearProductList } from "../Redux/Actions/Actions";

import { firestore, firestoreCollection, firestoreGetDocs } from '../Firebase';
export default function Product_Listings_Page() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.ProductList);

    useEffect(() => {
        async function getData() {
            //const productRef = firestoreCollection(firestore, "product_listings");

            const q = await firestoreGetDocs(firestoreCollection(firestore, "product_listings"));
            q.forEach((doc) => {
                let data = doc.data();
                let object = {
                    images: data.images,
                    name: data.name,
                    price: data.price,
                    uid: data.uid,
                    description: data.description,
                }
                dispatch(addItem(object));
            });

            //const q = firestoreQuery(productRef, firestoreWhere(""));
        }
        dispatch(clearProductList());
        getData();
        
        console.log(productList);
    }, []);
    return (
        <div className="bg-[#E9F7CA] text-center">
            <div>
                <CreateItemPost/>
            </div>
            <div className="flex">
                <div className="flex-1">
                    <SearchBarComponent/>
                </div>
                <p className="m-auto flex-1">FILTERS</p>
            </div>
            
            {/* Display */}
            <div className=" flex flex-wrap justify-stretch bg-[#eeee] ml-[5vw] mr-[5vw] min-h-screen h-fit">
                {productList.map((item) => {
                    return(
                        <ItemDisplay image={item.images[0]}
                                    title={item.name}
                                    location="Place"
                                    price={item.price}
                                    />                        
                    )
                })}
            </div>
        </div>
    )
}